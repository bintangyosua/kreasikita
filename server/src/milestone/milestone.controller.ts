import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { MilestoneService } from './milestone.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateMilestoneDto } from 'src/milestone/dto/createmilestone.dto';
import { Response } from 'src/types/response.type';
import { UsersService } from 'src/users/users.service';

@Controller('milestone')
export class MilestoneController {
    constructor(
        private readonly milestoneService: MilestoneService,
        private readonly userService: UsersService
    ) {}

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get()
    @HttpCode(HttpStatus.OK)
    async getMilestone():Promise<Response> {
        return {
            status: HttpStatus.OK,
            message: 'Data Fetched',
            data: await this.milestoneService.findAll(),
        };
    }
    
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getmilestoneById(@Param('id') id: number):Promise<Response> {
        if (await this.milestoneService.findOne(id) === undefined) {
            throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
        } else if(isNaN(id)) {
            throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
        } else {
            return {
                status: HttpStatus.OK,
                message: 'Data Fetched',
                data: await this.milestoneService.findOne(id),
            };
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Post()
    @HttpCode(HttpStatus.OK)
    async createMilestone(@Body() createMilestoneDto: CreateMilestoneDto): Promise<Response> {
        return {
            status: HttpStatus.OK,
            message: 'Milestone berhasil dibuat',
            data: await this.milestoneService.create(createMilestoneDto),
        };
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get('users/:id')
    @HttpCode(HttpStatus.OK)
    async getMilestoneByUser(@Param('id') userId: number):Promise<Response> {
        if (await this.userService.findOne(userId) === undefined) {
            throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
        } else if(isNaN(userId)) {
            throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
        } else {
            return {
                status: HttpStatus.OK,
                message: 'Data Fetched',
                data: await this.milestoneService.findByUser(userId),
            };
        }
    }


    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Post(':id')
    @HttpCode(HttpStatus.OK)
    async updateMilestone(@Param('id') id: number, @Body() updateMilestoneDto: CreateMilestoneDto): Promise<Response> {
        if (await this.milestoneService.findOne(id) === undefined) {
            throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
        } else {
            return {
                status: HttpStatus.OK,
                message: 'Milestone berhasil diupdate',
                data: await this.milestoneService.update(id, updateMilestoneDto),
            };
        }
    }



}
