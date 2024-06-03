import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
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
    private milestoneService: MilestoneService,
  ) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  @HttpCode(HttpStatus.OK)
  async getDonations(): Promise<Response> {
    return {
      status: HttpStatus.OK,
      message: 'Data fetched',
      data: await this.donationService.findAll(),
    };
  }

  @UseGuards(AuthGuard)
  @Get('groupby/sender')
  @HttpCode(HttpStatus.OK)
  async getDonationsGroupBySender(@Request() req): Promise<Response> {
    const donations = await this.donationService.findDonationsByReceiver(
      req.user.username,
    );

    const arr: {
      username: string;
      total: number;
      name: string;
      email: string;
      pfp: string;
    }[] = await Promise.all(
      donations.map(async (donation) => {
        const user = await this.userService.findOneByUsername(
          donation.senderUsername,
        );
        return {
          username: donation.senderUsername,
          total: donation._sum.gross_amount,
          email: user.email,
          name: user.name,
          pfp: user.pfp,
        };
      }),
    );

    return {
      status: HttpStatus.OK,
      message: 'Data fetched',
      data: arr,
    };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('receiver')
  @HttpCode(HttpStatus.OK)
  async getDonationsByReceiver(@Req() req): Promise<Response> {
    if (
      (await this.donationService.findManyByReceiver(req.user.username)) ===
      undefined
    ) {
      throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
    } else {
      return {
        status: HttpStatus.OK,
        message: 'Data fetched',
        data: await this.donationService.findManyByReceiver(req.user.username),
      };
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getDonationById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Response> {
    if ((await this.donationService.findOne(id)) === undefined) {
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
  @Get('sender/:username')
  @HttpCode(HttpStatus.OK)
  async getDonationsBySender(
    @Param('username') username: string,
  ): Promise<Response> {
    if ((await this.donationService.findManyBySender(username)) === undefined) {
      throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
    } else {
      return {
        status: HttpStatus.OK,
        message: 'Data fetched',
        data: await this.donationService.findManyBySender(username),
      };
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async newDonation(
    @Body() createDonationDto: CreateDonationDto,
  ): Promise<Response> {
    const donation = await this.donationService.create(createDonationDto);
    const receiver = await this.userService.findOneByUsername(
      donation.receiverUsername,
    );
    if (receiver === undefined) {
      throw new HttpException('Receiver not found', HttpStatus.NOT_FOUND);
    } else if (donation.gross_amount < 0) {
      throw new HttpException('Invalid amount', HttpStatus.BAD_REQUEST);
    } else {
      await this.userService.update(receiver.id, {
        balance: receiver.balance + donation.gross_amount,
      });
      const milestone = await this.milestoneService.findByUser(receiver.id);
      if (milestone !== undefined) {
        await this.milestoneService.update(milestone.id, {
          current: milestone.current + donation.gross_amount,
        });
      }
      return {
        status: HttpStatus.CREATED,
        message: 'Donation created',
        data: donation,
      };
    }
  }
}
