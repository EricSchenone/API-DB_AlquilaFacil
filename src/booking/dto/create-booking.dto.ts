import { IsDate, IsBoolean, IsNumber } from 'class-validator';
import { Timestamp } from 'typeorm';

export class BookingDto {
    @IsDate()
    readonly date: Timestamp;

    @IsDate()
    readonly date_init: Timestamp;

    @IsDate()
    readonly date_finish: Timestamp;

    @IsNumber()
    readonly id_property: number;

    @IsBoolean()
    readonly status: boolean;

}
