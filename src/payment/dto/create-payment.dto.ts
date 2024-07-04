import { IsNumber, IsString } from "class-validator";

export class PaymentDto {
    @IsNumber()
    readonly payment_id: number;
    
    @IsString()
    readonly status: string;
    
    @IsString()
    readonly payment_type: string;
    
    @IsNumber()
    readonly merchant_order_id: number;
    
    @IsString()
    readonly id_preference : string;
    
    @IsString()
    readonly processing_mode: string;
    
}


