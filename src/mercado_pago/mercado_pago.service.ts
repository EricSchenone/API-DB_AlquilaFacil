import { MercadoPagoConfig, Preference } from 'mercadopago';
import { MercadoPagoDto } from './dto/create-mercado_pago.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MercadoPago } from './entities/mercado_pago.entity';
import { Repository } from 'typeorm';


@Injectable()
export class MercadoPagoService {
  private readonly client: MercadoPagoConfig;

  constructor(@InjectRepository(MercadoPago)
  private readonly repositoryMercadoPago: Repository<MercadoPago>) {
    this.client = new MercadoPagoConfig({
      accessToken: 'APP_USR-402402211592519-041618-44bfd8201c56a30502c7fd176a89a389-1772060269', 
    });
  }

  async createPreference(mercadoPagoDto: MercadoPagoDto): Promise<any> {
    
    const preference = new Preference(this.client);

    const res = await preference.create({
      body: {
        items: [
          {
            title: mercadoPagoDto.title,
            quantity: mercadoPagoDto.quantity,
            unit_price: mercadoPagoDto.unit_price,
            id: '1'
          }
        ],
      }
    })
    console.log(res);
    
    const newPreference: MercadoPago = new MercadoPago(mercadoPagoDto.title, mercadoPagoDto.quantity, mercadoPagoDto.unit_price);
    await this.repositoryMercadoPago.save(newPreference);

    return { id: res.id };
  }

  async getAll(): Promise<MercadoPago[]> {
    const allPreferences: MercadoPago[] = await this.repositoryMercadoPago.find();
    return allPreferences;
  }
}