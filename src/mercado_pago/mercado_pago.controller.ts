import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { MercadoPagoDto } from './dto/create-mercado_pago.dto';
import { MercadoPagoService } from './mercado_pago.service';
import { MercadoPago } from './entities/mercado_pago.entity';

@Controller('mercado_pago')
export class MercadoPagoController {
  constructor(
    private readonly mercadoPagoService: MercadoPagoService,
  ) { }

  @Get()
  async getAll(): Promise<MercadoPago[]> {
    return this.mercadoPagoService.getAll()
  }

  @Post('/create_preference')
  async createPreference(@Body() mercadoPagoDto: MercadoPagoDto): Promise<string> { 
    const preferenceId = await this.mercadoPagoService.createPreference(mercadoPagoDto);
    return preferenceId;
  }
}
