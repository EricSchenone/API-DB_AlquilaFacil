import { IsNumber, IsString } from "class-validator";

export class PropertyDto {
    @IsString()
    readonly title: string;
    @IsString()
    readonly description: string;
    @IsNumber()
    readonly rooms: number;
    @IsNumber()
    readonly price: number;
    @IsString()
    readonly images: string[];
    @IsNumber()
    readonly rate: number;
    @IsString()
    readonly type: string;s
    @IsString()
    readonly address: string;
    @IsString()
    readonly url_iframe: string;
  
}
