import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MercadoPagoDto {
    @IsString()
    readonly title: string;

    @IsNumber()
    readonly quantity: number;

    @IsNumber()
    readonly unit_price: number;

    

}