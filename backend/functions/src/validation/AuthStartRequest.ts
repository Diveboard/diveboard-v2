import { IsEmail } from 'class-validator';

export class AuthStartRequest {
    @IsEmail()
    email: string;
}
