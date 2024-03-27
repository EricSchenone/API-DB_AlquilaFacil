import { IsDate, IsBoolean } from 'class-validator';

export class BookingDto {
    @IsDate()
    readonly date: Date
    readonly date_init: Date
    readonly date_finish: Date

    @IsBoolean()
    readonly status: boolean

}
