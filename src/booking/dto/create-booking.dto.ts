import { IsDate, IsBoolean } from 'class-validator';

export class BookingDto {
    @IsDate()
    readonly date: Date;

    @IsDate()
    readonly date_init: Date;

    @IsDate()
    readonly date_finish: Date;

    @IsBoolean()
    readonly status: boolean;

}
