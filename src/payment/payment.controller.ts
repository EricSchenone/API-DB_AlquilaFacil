import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';


@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPayment(
    @Body() paymentDto: PaymentDto
  ): Promise<Payment> {
    return this.paymentService.createPayment(paymentDto);
  }

  @Get()
  async getAllPayments(): Promise<Payment[]> {
    return this.paymentService.getAllPayments();
  }

  @Get(':id')
  async getPaymentById(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }) )
     id: string
    ): Promise<Payment> {
    return this.paymentService.getPaymentById(+id);
  }

  @Delete(':id')
  async deletePayment(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }) )
     id: string): Promise<void> {
    return this.paymentService.deletePayment(+id);
  }
}
