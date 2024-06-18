import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const countCreators = await this.prismaService.user.count();
    const countSupporters = await this.prismaService.donation.count();
    const sumDonations = await this.prismaService.donation.aggregate({
      _sum: {
        gross_amount: true,
      },
    });

    return {
      countCreators,
      countSupporters,
      sumDonations,
    };
  }

  async findStatsByUsername(username: string) {
    const countSupporters = await this.prismaService.donation.count();
    const sumDonations = await this.prismaService.donation.aggregate({
      _sum: {
        gross_amount: true,
      },
      where: {
        senderUsername: username,
        transaction_time: {
          lte: new Date(),
          gte: new Date(new Date().setDate(new Date().getDate() - 30)),
        },
      },
    });
    const sumAllDonations = await this.prismaService.donation.aggregate({
      _sum: {
        gross_amount: true,
      },
    });

    return {
      countDonations: countSupporters,
      sumDonations: sumDonations._sum.gross_amount,
      sumAllDonations: sumAllDonations._sum.gross_amount,
    };
  }
}
