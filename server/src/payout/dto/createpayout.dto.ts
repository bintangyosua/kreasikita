import { Optional } from '@nestjs/common';
import { IsDate, IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePayoutDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  @IsDateString()
  timecreated: Date;

  @IsNotEmpty()
  card_number: string;

  @IsNotEmpty()
  bank_code: string;

  @Optional()
  description?: string;

  user: any;
  bank: any;
}
