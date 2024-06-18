import { IsArray, IsNumber, IsString } from "class-validator";

export class PropertyDto {
    @IsString()
    readonly title: string;
    
    @IsString()
    readonly description: string;
    
    @IsNumber()
    readonly rooms: number;
    
    @IsNumber()
    readonly price: number;
    
    @IsString({ each: true })
    readonly images: string[];
    
    @IsNumber()
    readonly rate: number;
    
    @IsString()
    readonly type: string;
    
    @IsString()
    readonly address: string;
     
    @IsString()
    readonly url_iframe: string;
    
    @IsNumber()
    readonly id_user: number;
    
    @IsNumber()
    readonly id_location: number;
  
}
