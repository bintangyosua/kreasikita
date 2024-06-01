import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDonationDto {
<<<<<<< HEAD
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
=======
    amount: number;
    senderName: string;
    receiverId: number;
    message: string;
    sender: any;
    receiver: any;
}
>>>>>>> b6a9ead5094d0c38dea99ec3db173ed5b7d5e753
