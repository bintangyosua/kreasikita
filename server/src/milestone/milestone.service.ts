import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MilestoneService {
    constructor(private prisma : PrismaService) {}
    
    async findAll() {
        return this.prisma.milestones.findMany();
    }

    async findOne(id: number) {
        return this.prisma.milestones.findUnique({
            where: {
                id: parseInt(id.toString()),
            },
        });
    }

    async findByUser(userId: number) {
        return this.prisma.milestones.findUnique({
            where: {
                userId: parseInt(userId.toString()),
            },
        });
    }

    async create(data: Prisma.MilestonesCreateInput) {
        return this.prisma.milestones.create({
            data: data,
        });
    }

    async update(id: number, data: Prisma.MilestonesUpdateInput) {
        return this.prisma.milestones.update({
            where: {
                id: parseInt(id.toString()),
            },
            data: data,
        });
    }

    async remove(id: number) {
        return this.prisma.milestones.delete({
            where: {
                id: parseInt(id.toString()),
            },
        });
    }
}
