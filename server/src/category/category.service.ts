import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}
    
    async findAll() {
        return this.prisma.category.findMany();
    }
    
    async findOne(id: number) {
        return this.prisma.category.findUnique({
            where: { id: parseInt(id.toString()) },
        });
    }
    
    async create(data: Prisma.CategoryCreateInput) {
        return this.prisma.category.create({
        data: data,
        });
    }
}

