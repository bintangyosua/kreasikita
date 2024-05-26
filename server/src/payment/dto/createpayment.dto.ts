import { IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  order_id: string;

  @IsNotEmpty()
  gross_amount: number;
}
