import { IsString } from 'class-validator';
import { ExchageRateInput } from '../../graphql/schema';

export class ExchangeRateDto extends ExchageRateInput {
    @IsString()
    currency: string;
}
