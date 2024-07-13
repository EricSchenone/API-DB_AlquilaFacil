import { IsEmail, IsString } from "class-validator";

export class ValidationDto {
    @IsEmail()
    readonly email: string;

    @IsString()    
    readonly password: string;
}