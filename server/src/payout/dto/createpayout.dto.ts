import { Bank } from '@prisma/client';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePayoutDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  bank: Bank;

  @IsNotEmpty()
  description: string;

  user: any;
}
