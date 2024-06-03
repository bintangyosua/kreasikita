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
        id: id,
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

  async notification(
    data: Prisma.DonationUpdateInput,
    newData: Prisma.DonationCreateInput,
  ) {
    return this.prisma.donation.upsert({
      where: { order_id: newData.order_id },
      update: {
        payment_type: data.payment_type,
        transaction_status: data.transaction_status,
        transaction_time: newData.transaction_time,
      },
      create: {
        order_id: newData.order_id,
        gross_amount: newData.gross_amount,
        transaction_status: 'pending',
        senderUsername: newData.sender.connect.username,
        senderEmail: newData.senderEmail,
        senderName: newData.senderName,
        receiverUsername: newData.receiver.connect.username,
        message: newData.message,
      },
    });
  }

  async findDonationsByReceiver(receiverUsername: string) {
    return this.prisma.donation.groupBy({
      by: ['senderUsername'],
      _sum: {
        gross_amount: true,
      },
      where: {
        receiverUsername,
      },
    });
  }
}
