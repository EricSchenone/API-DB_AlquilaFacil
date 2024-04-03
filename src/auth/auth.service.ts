import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private userRepository: Repository<User>) { }

  async login(email: string, pass: string): Promise<any> {
    const criteria: FindOneOptions = { where: { email: email }  }
    const user = await this.userRepository.findOne(criteria);
    if (user?.getPassword() !== pass) {
      throw new UnauthorizedException();
    }
    user.setPassword(undefined);
    return user
  }
  
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
