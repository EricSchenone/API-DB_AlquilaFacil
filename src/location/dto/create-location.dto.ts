import { IsString } from 'class-validator';

export class LocationDto {
    @IsString()
    readonly country: string
    readonly state: string
    readonly city: string
}
