import { IsNumber,  IsString } from "class-validator";

export class UserDto {
    
    @IsString()
    readonly name: string

    @IsString()
    readonly lastname: string

    @IsString()
    readonly email: string

    @IsString()
    readonly password: string

    @IsString()
    readonly username: string

   
}