import { IsEmail, Length } from 'class-validator';

export class LogInRequest {
    @IsEmail()
    email: string;

    @Length(6, 6)
    otp: string;
}
