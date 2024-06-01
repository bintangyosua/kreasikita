import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: parseInt(id.toString()),
      },
    });
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findOneByName(name: string) {
    return this.prisma.user.findFirst({
      where: {
        name,
      },
    });
  }

  async findManyByCategory(categoryId: number) {
    return this.prisma.user.findMany({
      where: {
        categoryId: parseInt(categoryId.toString()),
      },
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: {
        id: parseInt(id.toString()),
      },
      data: data,
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: data,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id: parseInt(id.toString()),
      },
    });
  }
}
