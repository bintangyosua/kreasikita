import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DonationService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.donation.findMany({
      where: {
        transaction_status: 'settlement',
      },
    });
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
    const donations = await this.prisma.donation.findMany({
      where: {
        receiver: {
          username: receiverUsername,
        },
        transaction_status: 'settlement',
      },
      orderBy: {
        transaction_time: 'desc',
      },
    });

    return donations;
  }

  async create(data: Prisma.DonationCreateInput) {
    return this.prisma.donation.create({
      data,
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
      where: { order_id: newData.order_id as string },
      update: {
        payment_type: data.payment_type,
        transaction_status: data.transaction_status,
        transaction_time: data.transaction_time,
      },
      create: {
        order_id: newData.order_id,
        gross_amount: newData.gross_amount,
        message: newData.message,
        receiver: newData.receiver,
        sender: newData.sender,
        transaction_status: 'pending',
        transaction_time: newData.transaction_time,
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
        transaction_status: 'settlement',
      },
    });
  }
}
