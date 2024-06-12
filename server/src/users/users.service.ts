import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        pfp: true,
        category: true,
        banner: true,
        balance: true,
        email: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: parseInt(id.toString()),
      },
    });
  }

  async findBalance(receiverUsername: string) {
    return this.prisma.user.findFirst({
      where: {
        username: receiverUsername,
      },
      select: {
        balance: true,
      },
    });
  }

  async findOneByUsername(username: string) {
    let user = await this.prisma.user.findFirst({
      where: {
        username,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (user) {
      let { password, ...newUser } = user;
      return newUser;
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findOneByName(name: string) {
    return this.prisma.user.findFirst({
      where: {
        name,
      },
    });
  }

  async findManyByCategoryName(name: string) {
    return this.prisma.user.findMany({
      where: {
        category: {
          name,
        },
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

  async updateByUsername(username: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: {
        username,
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
