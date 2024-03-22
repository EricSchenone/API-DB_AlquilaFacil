import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyModule } from './property/property.module';
import { UserModule } from './user/user.module';
import { LocationModule } from './location/location.module';
import { BookingModule } from './booking/booking.module';
import { PropertiesUsersModule } from './properties_users/properties_users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot( {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'alquila_facil',
      entities: [
        'dist/**/**.entity{.ts,.js}' 
      ],
      synchronize: true
    }),
    PropertyModule,
    UserModule,
    LocationModule,
    BookingModule,
    PropertiesUsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
