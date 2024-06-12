import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BankService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.bank.findMany();
  }
}
