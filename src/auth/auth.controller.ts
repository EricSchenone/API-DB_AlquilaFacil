import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Put, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { User } from 'src/user/entities/user.entity';
import { ValidationDto } from './dto/validationUser-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async registerUser(@Body() register: RegisterDto): Promise<User> {
    return this.authService.registerUser(register)
  } 

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('validate')
  async validationUser(@Body() validationDto: ValidationDto): Promise<void> {
    return this.authService.validationUser(validationDto);
  }

  
}


