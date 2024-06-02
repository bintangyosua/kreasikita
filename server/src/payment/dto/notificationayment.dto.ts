import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class NotificationPaymentDto {
  @IsOptional()
  settlement_time?: string;

  @IsOptional()
  transaction_time?: string;

  @IsOptional()
  @IsString()
  transaction_status?: string;

  @IsOptional()
  @IsString()
  payment_type?: string;

  @IsNotEmpty()
  @IsString()
  order_id: string;

  @IsNotEmpty()
  gross_amount: string;

  @IsOptional()
  @IsString()
  senderUsername?: string;

  @IsOptional()
  @IsString()
  senderEmail?: string;

  @IsOptional()
  @IsString()
  senderName?: string;

  @IsOptional()
  @IsString()
  receiverUsername?: string;

  @IsOptional()
  @IsString()
  message?: string;
}
