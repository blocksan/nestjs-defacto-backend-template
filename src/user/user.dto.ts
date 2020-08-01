import { IsNotEmpty, IsEmail, Contains, IsEmpty } from 'class-validator';

export class UserDto {

    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

}