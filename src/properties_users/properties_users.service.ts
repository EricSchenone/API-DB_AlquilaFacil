import { Injectable } from '@nestjs/common';
import { CreatePropertiesUserDto } from './dto/create-properties_user.dto';
import { UpdatePropertiesUserDto } from './dto/update-properties_user.dto';

@Injectable()
export class PropertiesUsersService {
  create(createPropertiesUserDto: CreatePropertiesUserDto) {
    return 'This action adds a new propertiesUser';
  }

  findAll() {
    return `This action returns all propertiesUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propertiesUser`;
  }

  update(id: number, updatePropertiesUserDto: UpdatePropertiesUserDto) {
    return `This action updates a #${id} propertiesUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} propertiesUser`;
  }
}
