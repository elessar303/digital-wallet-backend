import { IsString } from 'class-validator';
import { SaveWalletInput } from '../../graphql/schema';

export class SaveWalletDto extends SaveWalletInput {
    @IsString()
    address: string;
}
