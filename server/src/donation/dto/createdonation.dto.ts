import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDonationDto {
  @IsNotEmpty()
  order_id: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNumber()
  senderId?: number;

  senderEmail: string;

  @IsString()
  senderName?: string;

  @IsNotEmpty()
  @IsNumber()
  receiverId: number;

  @IsNotEmpty()
  @IsString()
  message: string;

  sender: any;
  receiver: any;
}
