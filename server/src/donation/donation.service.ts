import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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

  async findManyBySender(senderId: number) {
    return this.prisma.donation.findMany({
      where: {
        senderId: parseInt(senderId.toString()),
      },
    });
  }

  async findManyByReceiver(receiverId: number) {
    return this.prisma.donation.findMany({
      where: {
        receiverId: parseInt(receiverId.toString()),
      },
    });
  }

  async create(data: Prisma.DonationCreateInput) {
    return this.prisma.donation.create({
      data: data,
    });
  }
}
