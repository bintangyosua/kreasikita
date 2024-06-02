import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  order_id: string;

  @IsNotEmpty()
  gross_amount: number;

  @IsOptional()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  item_details?: any;
}
