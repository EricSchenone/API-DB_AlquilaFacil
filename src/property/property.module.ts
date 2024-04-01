import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { Property } from './entities/property.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Booking 
} from 'src/booking/entities/booking.entity';
import { Location } from 'src/location/entities/location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Property, User, Booking, Location
    ])
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule { }
