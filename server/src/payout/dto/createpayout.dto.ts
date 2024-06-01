import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePayoutDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNumber()
  userId: number;

  user: any;
}
