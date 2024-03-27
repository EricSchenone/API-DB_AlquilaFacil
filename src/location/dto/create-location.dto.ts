import { IsString } from 'class-validator';

export class LocationDto {
    @IsString()
    readonly country: string;

    @IsString()
    readonly state: string;

    @IsString()
    readonly city: string;
}
