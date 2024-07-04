import { Controller, Get, Post, Put, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(@Param(('id'), new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
  })) id: string): Promise<User> {
    return this.userService.getUserById(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateUser(@Param('id', new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
  })) id: number,
    @Body() user: UserDto): Promise<User> {
      return this.userService.updateUser(id, user)
    }

}
