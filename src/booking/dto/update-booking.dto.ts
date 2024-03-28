import { PartialType } from '@nestjs/mapped-types';
import { BookingDto } from './create-booking.dto';

export class UpdateBookingDto extends PartialType(BookingDto) {}
