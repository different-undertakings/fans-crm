import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.model';

@ApiTags('Users')
@ApiBearerAuth('JWT')
@Controller('api/v1')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add-user')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiBody({
    description: 'User creation credentials',
    type: CreateUserDto,
  })
  async createUser(@Body() body: CreateUserDto): Promise<void> {
    return this.usersService.createUser(body);
  }

  @Get('get-user/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully found.',
  })
  async getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }
}
