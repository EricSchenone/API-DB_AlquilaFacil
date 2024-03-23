import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }


  @Get()
  async getAll(): Promise<Booking[]> {
    return this.bookingService.getAll();
  }

  @Get(':id')
  async getBookingById(@Param(('id'), new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
  })) id: string): Promise<Booking> {
    return this.bookingService.getBookingById(+id);
  }
}
