import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDonationDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNumber()
  senderId?: number;

  @IsNotEmpty()
  @IsString()
  senderName: string;

  @IsNotEmpty()
  @IsNumber()
  receiverId: number;

  @IsNotEmpty()
  @IsString()
  message: string;

  sender: any;
  receiver: any;
}
