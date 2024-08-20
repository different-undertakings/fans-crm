import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: 'Name for registration' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Password for registration' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class LoginDto {
  @ApiProperty({ description: 'Name for login' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Password for login' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
