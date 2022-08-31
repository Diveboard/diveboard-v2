import { IsBoolean, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class OneTimeDonationRequest {
    @IsOptional()
    @IsString()
    token?: string;

    @IsNumber()
    @Min(50)
    amount: number;

    @IsOptional()
    @IsBoolean()
    saveCard?: boolean;
}
