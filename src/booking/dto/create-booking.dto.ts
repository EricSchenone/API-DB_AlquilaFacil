import { IsDate, IsBoolean, IsNumber } from 'class-validator';

export class BookingDto {
    @IsDate()
    readonly date: Date;

    @IsDate()
    readonly date_init: Date;

    @IsDate()
    readonly date_finish: Date;

    @IsNumber()
    readonly id_property: number;

    @IsBoolean()
    readonly status: boolean;

}
