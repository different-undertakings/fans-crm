import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async createUser(body: any): Promise<void> {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    await this.userModel.create({ ...body, password: hashedPassword });
  }
  async findOne(id: string): Promise<User> {
    return this.userModel.findByPk(id);
  }
}
