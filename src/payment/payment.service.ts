import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(@InjectRepository(Payment)
  private readonly paymentRepository: Repository<Payment>) { }
  
  async createPayment(paymentDto: PaymentDto): Promise<Payment> {
    try{
      const newPayment: Payment = new Payment( 
        paymentDto.payment_id, 
        paymentDto.status, 
        paymentDto.payment_type, 
        paymentDto.merchant_order_id, 
        paymentDto.id_preference, 
        paymentDto.processing_mode );
      const savedPayment = await this.paymentRepository.save(newPayment);
      if(savedPayment) return savedPayment;
    } catch(error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en la consulta a la base de datos' + error
        },
          HttpStatus.INTERNAL_SERVER_ERROR)
      };
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'No se pudo registrar el pago' + error
      }, HttpStatus.NOT_FOUND)

    }
  }

  async getAllPayments(): Promise<Payment[]> {
    try{
      const payments: Payment[] = await this.paymentRepository.find({
        relations: {
          mercadoPago: true,
        }
      });
      return payments;

    } catch(error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en la consulta a la base de datos'
        },
          HttpStatus.INTERNAL_SERVER_ERROR)
      };
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error al recuperar los datos' + error
      }, HttpStatus.NOT_FOUND)

    }
  }

  async getPaymentById(id: number): Promise<Payment> {
    try{
      const criteria: FindOneOptions = { where: { payment_id: id } };
      const payment: Payment = await this.paymentRepository.findOne(criteria);
      if(payment) return payment;
    } catch(error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en la consulta a la base de datos'
        },
          HttpStatus.INTERNAL_SERVER_ERROR)
      };
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'No existe un pago registrado con el id:' + id + error
      }, HttpStatus.NOT_FOUND)

    }
    
  }

  async deletePayment(id: number): Promise<any> {
    try {
      const reesult = await this.paymentRepository.delete(id);
    } catch(error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en la consulta a la base de datos'
        },
          HttpStatus.INTERNAL_SERVER_ERROR)
      };
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'No existe un pago registrado con el id:' + id + error
      }, HttpStatus.NOT_FOUND)

    }
  }
}
