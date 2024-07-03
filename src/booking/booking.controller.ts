import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, HttpStatus, Patch } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';


@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Post()
  async createBooking(
    @Body() booking: BookingDto
  ): Promise<Booking> {
    console.log(booking);
    
    return this.bookingService.createBooking(booking)
  }

  @Get()
  async getAll(): Promise<Booking[]> {
    return this.bookingService.getAll();
  }

  @Get(':id')
  async getBookingById(
    @Param(('id'), new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: string
  ): Promise<Booking> {
    return this.bookingService.getBookingById(+id);
  }

  @Get('/byPreference/:id_preference')
  async getBookingByPreference(
    @Param('id_preference') id_preference: string
  ): Promise<Booking> {
    return this.bookingService.getBookingByPreference(id_preference);
  }

  @Put(':id')
  async updateBooking(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
    @Body() booking: BookingDto,
  ): Promise<Booking> {
    return this.bookingService.updateBooking(id, booking);
  }

  @Delete(':id')
  async deleteBooking(
    @Param(('id'), new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
  ): Promise<any> {
    return this.bookingService.deleteBooking(id);
  }

}
