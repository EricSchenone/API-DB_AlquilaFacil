import { Controller, Get, Post, Body, Inject, UseGuards } from '@nestjs/common';
import { MercadoPagoDto } from './dto/create-mercado_pago.dto';
import { MercadoPagoService } from './mercado_pago.service';
import { MercadoPago } from './entities/mercado_pago.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('mercado_pago')
export class MercadoPagoController {
  constructor(
    private readonly mercadoPagoService: MercadoPagoService,
  ) { }

  
  @Post('/create_preference')
  @UseGuards(AuthGuard)
  async createPreference(@Body() mercadoPagoDto: MercadoPagoDto): Promise<string> { 
    const preferenceId = await this.mercadoPagoService.createPreference(mercadoPagoDto);
    return preferenceId;
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAll(): Promise<MercadoPago[]> {
    return this.mercadoPagoService.getAll()
  }

  
}