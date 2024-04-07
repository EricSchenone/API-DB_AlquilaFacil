import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
/*
  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.userService.createUser(createUserDto);
  }*/

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getUserById(@Param(('id'), new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
  })) id: string): Promise<User> {
    return this.userService.getUserById(+id);
  }


}
