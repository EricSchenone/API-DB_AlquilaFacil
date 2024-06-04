import { IsDate, IsBoolean, IsNumber } from 'class-validator';
import { Timestamp } from 'typeorm';

export class BookingDto {
    @IsNumber()
    readonly date: number;

    @IsNumber()
    readonly date_init: number;

    @IsNumber()
    readonly date_finish: number;

    @IsNumber()
    readonly id_property: number;

    @IsBoolean()
    readonly status: boolean;

    readonly id_preference: string;

}
