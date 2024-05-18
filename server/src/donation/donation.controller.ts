import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { DonationService } from './donation.service';
import { UsersService } from '../users/users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'src/types/response.type';
import { CreateDonationDto } from './dto/createdonation.dto';

@Controller('donations')
export class DonationController {
    constructor(
        private donationService: DonationService,
        private userService: UsersService
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
        return {
            status: HttpStatus.OK,
            message: 'Data fetched',
            data: await this.donationService.findOne(id),
        };
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get('receiver/:id')
    @HttpCode(HttpStatus.OK)
    async getDonationsByReceiver(@Param('id') id: number): Promise<Response> {
        return {
            status: HttpStatus.OK,
            message: 'Data fetched',
            data: await this.donationService.findManyByReceiver(id),
        };
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get('sender/:id')
    @HttpCode(HttpStatus.OK)
    async getDonationsBySender(@Param('id') id: number): Promise<Response> {
        return {
            status: HttpStatus.OK,
            message: 'Data fetched',
            data: await this.donationService.findManyBySender(id),
        };
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async newDonation(@Body() createDonationDto: CreateDonationDto): Promise<Response> {
        const donation = await this.donationService.create(createDonationDto);
        const receiver = await this.userService.findOne(donation.receiverId);
        await this.userService.update(receiver.id, { balance: receiver.balance + donation.amount })
        return {
            status: HttpStatus.CREATED,
            message: 'Donation berhasil dibuat',
            data: donation,
        };
    }

}
