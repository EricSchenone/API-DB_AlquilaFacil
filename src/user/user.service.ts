import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { FindOneOptions, QueryFailedError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UserService {

  constructor(@InjectRepository(User)
  private readonly userRepository: Repository<User>) { }

  public async createUser(userDto: UserDto): Promise<User> {
    try {
    
      const newUser: User = new User(userDto.name, userDto.lastname, userDto.email, userDto.password, userDto.username)
      newUser.setName(userDto.name)
      newUser.setLastname(userDto.lastname)
      newUser.setEmail(userDto.email)
      newUser.setPassword(userDto.password)
      newUser.setUsername(userDto.username)
      const savedUser: User = await this.userRepository.save(newUser)
      if (savedUser.getIdUser()) return newUser;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          message:'Error en la consulta a la base de datos',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error
        },
          HttpStatus.INTERNAL_SERVER_ERROR)
      };
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Error en la creacion del usuario'
      }, HttpStatus.BAD_REQUEST)
    }



  }

  async getAll(): Promise<User[]> {
    const allUsers: User[] = await this.userRepository.find()
    return allUsers;
  }

  async getUserById(id: number): Promise<User> {
    try {
      const criteria: FindOneOptions = { where: { id_user: id } };
      const user: User = await this.userRepository.findOne(criteria)
      if (user) return user;
      throw new Error('No existe un usuario con el id:' + id)
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en la consulta a la base de datos'
        },
          HttpStatus.INTERNAL_SERVER_ERROR)
      };
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Error en la consulta del usuario'
      }, HttpStatus.BAD_REQUEST)
    }

  }

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


}


