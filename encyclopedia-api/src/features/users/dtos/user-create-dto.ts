import {IsEmail, IsNotEmpty, MinLength} from "class-validator";

export class UserCreateDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @MinLength(8)
    password: string;
}