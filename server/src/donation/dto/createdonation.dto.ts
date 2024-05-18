export class CreateDonationDto {
    amount: number;
    senderId?: number;
    senderName: string;
    receiverId: number;
    message: string;
    sender: any;
    receiver: any;
}