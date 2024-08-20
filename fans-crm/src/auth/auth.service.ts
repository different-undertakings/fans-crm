import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { JwtPayload } from './jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { JwtResponse } from './jwt-response.interface';

const bcryptHashValue: number = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async register(name: string, password: string): Promise<void> {
    const existingUser = await this.userModel.findOne({ where: { name } });
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, bcryptHashValue);
    await this.userModel.create({ name, password: hashedPassword });
  }

  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ where: { name } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return { id: user.id, username: user.name };
    }
    return null;
  }

  async login(name: string, password: string): Promise<JwtResponse> {
    const user = await this.validateUser(name, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { name };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
