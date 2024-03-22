import { Module } from '@nestjs/common';
import { PropertiesUsersService } from './properties_users.service';
import { PropertiesUsersController } from './properties_users.controller';

@Module({
  controllers: [PropertiesUsersController],
  providers: [PropertiesUsersService],
})
export class PropertiesUsersModule {}
