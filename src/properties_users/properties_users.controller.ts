import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertiesUsersService } from './properties_users.service';
import { CreatePropertiesUserDto } from './dto/create-properties_user.dto';
import { UpdatePropertiesUserDto } from './dto/update-properties_user.dto';

@Controller('properties-users')
export class PropertiesUsersController {
  constructor(private readonly propertiesUsersService: PropertiesUsersService) {}

  @Post()
  create(@Body() createPropertiesUserDto: CreatePropertiesUserDto) {
    return this.propertiesUsersService.create(createPropertiesUserDto);
  }

  @Get()
  findAll() {
    return this.propertiesUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertiesUserDto: UpdatePropertiesUserDto) {
    return this.propertiesUsersService.update(+id, updatePropertiesUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesUsersService.remove(+id);
  }
}
