import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { FindOneOptions, QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class BookingService {

  constructor(@InjectRepository(Booking)
  private readonly bookingRepository: Repository<Booking>) { }


  async getAll(): Promise<Booking[]> {
    const bookings: Booking[] = await this.bookingRepository.find();
    return bookings;
  }

  async getBookingById(id: number): Promise<Booking> {
    try {
      const criteria: FindOneOptions = { where: { id_booking: id } };
      const booking: Booking = await this.bookingRepository.findOne(criteria);
      if (booking) return booking;
      throw new Error('No existe una reserva con el id:' + id)
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
        error: 'Error en la consulta de la reserva'
      }, HttpStatus.BAD_REQUEST)
    }

  }
}