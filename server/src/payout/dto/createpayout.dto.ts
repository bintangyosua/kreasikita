import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePayoutDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  bank_code: String;

  @IsNotEmpty()
  description: string;

  user: any;
  bank: any;
}
