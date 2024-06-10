import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PayoutService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.payout.findMany();
  }

  async findOne(id: number) {
    return this.prisma.payout.findUnique({
      where: {
        id: parseInt(id.toString()),
      },
    });
  }

  async findManyByUsername(username: string) {
    return this.prisma.payout.findMany({
      where: {
        username,
      },
      orderBy: {
        timecreated: 'desc',
      },
    });
  }

  async create(data: Prisma.PayoutCreateInput) {
    return this.prisma.payout.create({
      data: data,
    });
  }

  async update(id: number, data: Prisma.PayoutUpdateInput) {
    return this.prisma.payout.update({
      where: {
        id: parseInt(id.toString()),
      },
      data: data,
    });
  }

  async remove(id: number) {
    return this.prisma.payout.delete({
      where: {
        id: parseInt(id.toString()),
      },
    });
  }
}
