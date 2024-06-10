import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async getBalance(receiverUsername: string) {
    return this.prisma.user.findFirst({
      where: {
        username: receiverUsername,
      },
      select: {
        balance: true,
      },
    });
  }

  async updateBalance(receiverUsername: string, amount: number) {
    return this.prisma.user.update({
      where: {
        username: receiverUsername,
      },
      data: {
        balance: amount,
      },
    });
  }
}
