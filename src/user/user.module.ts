import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from 'src/property/entities/property.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, Property
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
