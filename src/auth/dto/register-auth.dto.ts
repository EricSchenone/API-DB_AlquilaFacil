import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    readonly name: string

    @IsString()
    readonly lastname: string

    @IsEmail()
    readonly email: string
   
    @IsString()
    readonly username: string

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(8)
    readonly password: string

}