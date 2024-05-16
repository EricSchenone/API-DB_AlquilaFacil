import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BookingDto } from './dto/create-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { FindOneOptions, QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class BookingService {

  constructor(@InjectRepository(Booking)
  private readonly bookingRepository: Repository<Booking>) { }

  async createBooking(bookingDto: BookingDto): Promise<Booking> {
    try {
      const newBooking: Booking = new Booking(bookingDto.date, bookingDto.date_init, bookingDto.date_finish, bookingDto.id_property, bookingDto.status);
      newBooking.setDate(bookingDto.date);
      newBooking.setDateInit(bookingDto.date_init);
      newBooking.setDateFinish(bookingDto.date_finish);
      newBooking.setPropertyId(bookingDto.id_property);
      newBooking.setStatus(bookingDto.status);
      const savedBooking: Booking = await this.bookingRepository.create(newBooking);
      if (savedBooking.getIdBooking()) return newBooking;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en el registro en la base de datos'
        }, HttpStatus.INTERNAL_SERVER_ERROR)
      };
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'No se pudo crear el registro de la reserva'
      }, HttpStatus.BAD_REQUEST)
    };
  }

  async getAll(): Promise<Booking[]> {
    const bookings: Booking[] = await this.bookingRepository.find({
      relations: {
        property: true,
        preference: true
      }
    });
    return bookings;
  }

  async getBookingById(id: number): Promise<Booking> {
    try {
      const criteria: FindOneOptions = { where: { id_booking: id } };
      const booking: Booking = await this.bookingRepository.findOne(criteria);
      if (booking) return booking;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en la consulta a la base de datos'
        },
          HttpStatus.INTERNAL_SERVER_ERROR)
      };
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'No existe una reserva con el id:' + id
      }, HttpStatus.NOT_FOUND)
    }
  }

  async updateBooking(id: number, bookingDto: BookingDto): Promise<Booking> {
    try {
      const criteria: FindOneOptions = { where: { booking_id: id } };
      let updateBooking: Booking = await this.bookingRepository.findOne(criteria);
      updateBooking.setDate(bookingDto.date);
      updateBooking.setDateInit(bookingDto.date_init);
      updateBooking.setDateFinish(bookingDto.date_finish);
      updateBooking.setStatus(bookingDto.status);
      updateBooking = await this.bookingRepository.save(updateBooking);
      return updateBooking;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en la actualizacion de la rerserva en la base de datos'
        },
          HttpStatus.INTERNAL_SERVER_ERROR)
      };
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error en la actualizacion de la reserva, no existe un registro con el id:' + id
      },
        HttpStatus.NOT_FOUND)
    }
  }

  async deleteBooking(id: number): Promise<any> {
    try {
      const criteria: FindOneOptions = { where: { id_booking: id } };
      const booking: Booking = await this.bookingRepository.findOne(criteria);
      await this.bookingRepository.delete(booking.getIdBooking())
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en la consulta al base de datos'
        }, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'No existe un registro con el  id.' + id
      }, HttpStatus.NOT_FOUND)
    }
  }
}