import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { NotificationPaymentDto } from 'src/payment/dto/notificationayment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DonationService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.donation.findMany();
  }

  async findOne(id: number) {
    return this.prisma.donation.findUnique({
      where: {
        id: parseInt(id.toString()),
      },
    });
  }

  async findManyBySender(senderUsername: string) {
    return this.prisma.donation.findMany({
      where: {
        senderUsername: senderUsername,
      },
    });
  }

  async findManyByReceiver(receiverUsername: string) {
    return this.prisma.donation.findMany({
      where: {
        receiverUsername: receiverUsername,
      },
    });
  }

  async create(data: Prisma.DonationCreateInput) {
    return this.prisma.donation.create({
      data: data,
    });
  }

  async delete(order_id) {
    return this.prisma.donation.delete({
      where: {
        order_id,
      },
    });
  }

  async notification(data: Prisma.DonationCreateInput) {
    return this.prisma.donation.upsert({
      where: { order_id: data.order_id },
      update: {
        payment_type: data.payment_type,
        transaction_status: data.transaction_status,
        transaction_time: new Date(data.transaction_time),
      },
      create: {
        order_id: data.order_id,
        gross_amount: data.gross_amount,
        transaction_status: 'pending',
        senderUsername: data.senderUsername,
        senderEmail: data.senderEmail,
        senderName: data.senderName,
        receiverUsername: data.receiverUsername,
        message: data.message,
      },
    });
  }

  async findDonationsBySender() {
    // return this.prisma.donation.groupBy({
    //   by: ['senderUsername'],
    //   orderBy: { gross_amount: 'desc' },
    //   _sum: {
    //     gross_amount: true,
    //   },
    // });

    return this.prisma.$queryRaw(Prisma.sql`
SELECT 
    donation.senderUsername, 
    SUM(donation.gross_amount) AS total_donation,
    user.name,
    user.email,
    user.pfp
FROM 
    donation
JOIN 
    user 
ON 
    donation.senderUsername = user.username
GROUP BY 
    donation.senderUsername, 
    user.name;
`);
  }
}
