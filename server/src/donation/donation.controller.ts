import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { DonationService } from './donation.service';
import { UsersService } from '../users/users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'src/types/response.type';
import { CreateDonationDto } from './dto/createdonation.dto';
import { MilestoneService } from 'src/milestone/milestone.service';

@Controller('donations')
export class DonationController {
    constructor(
        private donationService: DonationService,
        private userService: UsersService,
        private milestoneService: MilestoneService
    ) {}

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get()
    @HttpCode(HttpStatus.OK)
    async getUsers(): Promise<Response> {
        return {
            status: HttpStatus.OK,
            message: 'Data fetched',
            data: await this.donationService.findAll(),
        };
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getDonationById(@Param('id') id: number): Promise<Response> {
        if (await this.donationService.findOne(id) === undefined) {
            throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
        } else if (isNaN(id)) {
            throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
        } else {
            return {
                status: HttpStatus.OK,
                message: 'Data fetched',
                data: await this.donationService.findOne(id),
            };
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get('receiver/:id')
    @HttpCode(HttpStatus.OK)
    async getDonationsByReceiver(@Param('id') id: number): Promise<Response> {
        if (await this.donationService.findManyByReceiver(id) === undefined) {
            throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
        } else if (isNaN(id)) {
            throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
        } else {
            return {
                status: HttpStatus.OK,
                message: 'Data fetched',
                data: await this.donationService.findManyByReceiver(id),
            };
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get('sender/:id')
    @HttpCode(HttpStatus.OK)
    async getDonationsBySender(@Param('id') id: number): Promise<Response> {
        if (await this.donationService.findManyBySender(id) === undefined) {
            throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
        } else if (isNaN(id)) {
            throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
        } else {
            return {
                status: HttpStatus.OK,
                message: 'Data fetched',
                data: await this.donationService.findManyBySender(id),
            };
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async newDonation(@Body() createDonationDto: CreateDonationDto): Promise<Response> {
        const donation = await this.donationService.create(createDonationDto);
        const receiver = await this.userService.findOne(donation.receiverId);
        if (receiver === undefined) {
            throw new HttpException('Receiver not found', HttpStatus.NOT_FOUND);
        } else if (donation.amount < 0) {
            throw new HttpException('Invalid amount', HttpStatus.BAD_REQUEST);
        } else {
            await this.userService.update(receiver.id, { balance: receiver.balance + donation.amount })
            const milestone = await this.milestoneService.findByUser(receiver.id);
            if (milestone !== undefined) {
                await this.milestoneService.update(milestone.id, { current: milestone.current + donation.amount });
            }
            return {
                status: HttpStatus.CREATED,
                message: 'Donation created',
                data: donation,
            };
        }
    }

}
