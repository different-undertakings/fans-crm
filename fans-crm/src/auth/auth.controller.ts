import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './auth.dto';
import { JwtResponse } from './jwt-response.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully registered.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiBody({
    description: 'Registration credentials',
    type: RegisterDto,
  })
  async register(@Body() body: RegisterDto): Promise<void> {
    const { name, password } = body;
    return this.authService.register(name, password);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in a user and return a JWT token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully logged in and token issued.',
    schema: {
      example: {
        accessToken: 'string',
      },
    },
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiBody({
    description: 'Login credentials',
    type: LoginDto,
  })
  async login(@Body() body: LoginDto): Promise<JwtResponse> {
    const { name, password } = body;
    return this.authService.login(name, password);
  }
}
