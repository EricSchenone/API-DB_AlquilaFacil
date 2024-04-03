import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneOptions, QueryFailedError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User)
  private readonly userRepository: Repository<User>) { }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const criteria: FindOneOptions = { where: { email: email } };
      const user: User = await this.userRepository.findOne(criteria);
      if (user) return user;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          stattus: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en la consulta a la base de datos'
        },
          HttpStatus.INTERNAL_SERVER_ERROR)
      };
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'No existe un usuario registrado con el email:' + email
      },
        HttpStatus.NOT_FOUND);
    }
  }
  
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
function Constructor(): (target: UserService, propertyKey: "getUserByEmail", descriptor: TypedPropertyDescriptor<(email: string) => Promise<User>>) => void | TypedPropertyDescriptor<(email: string) => Promise<User>> {
  throw new Error('Function not implemented.');
}

