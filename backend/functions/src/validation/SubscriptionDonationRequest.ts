import { IsOptional, IsString} from 'class-validator';

export class SubscriptionDonationRequest {
    @IsOptional()
    @IsString()
    token?: string;

    @IsString()
    subType: string;
}
