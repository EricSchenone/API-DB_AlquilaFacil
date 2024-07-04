import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, HttpStatus, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Post()
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  async updateBooking(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
    @Body() booking: BookingDto,
  ): Promise<Booking> {
    return this.bookingService.updateBooking(id, booking);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteBooking(
    @Param(('id'), new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
  ): Promise<any> {
    return this.bookingService.deleteBooking(id);
  }

}
