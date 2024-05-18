import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PayoutService } from './payout.service';
import { Response } from 'src/types/response.type';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePayoutDto } from './dto/createpayout.dto';
import { UsersService } from 'src/users/users.service';

@Controller('payouts')
export class PayoutController {
    constructor(
        private readonly payoutService: PayoutService,
        private readonly userService: UsersService
    ) {}

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get()
    @HttpCode(HttpStatus.OK)
    async getPayout():Promise<Response> {
        return {
            status: HttpStatus.OK,
            message: 'Data Fetched',
            data: await this.payoutService.findAll(),
        };
    }
    
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getpayoutById(@Param('id') id: number):Promise<Response> {
        return {
            status: HttpStatus.OK,
            message: 'Data Fetched',
            data: await this.payoutService.findOne(id),
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get('users/:id')
    @HttpCode(HttpStatus.OK)
    async getPayoutByUser(@Param('id') userId: number):Promise<Response> {
        return {
            status: HttpStatus.OK,
            message: 'Data Fetched',
            data: await this.payoutService.findManyByUser(userId),
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @HttpCode(HttpStatus.BAD_REQUEST)
    async newPayout(@Body() createPayoutDto: CreatePayoutDto): Promise<Response> {
        const payout = await this.payoutService.create(createPayoutDto);
        const user = await this.userService.findOne(payout.userId);
        if(user.balance > payout.amount) {
            return {
                status: HttpStatus.CREATED,
                message: 'Payout berhasil dibuat',
                data: payout,
            };
        } else {
            await this.payoutService.remove(payout.id);
            return {
                status: HttpStatus.BAD_REQUEST,
                message: 'Saldo tidak mencukupi',
                data: null,
            };
        }
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Post(':id')
    @HttpCode(HttpStatus.OK)
    async updatePayout(@Param('id') id: number, @Body() updatePayoutDto: CreatePayoutDto): Promise<Response> {
        return {
            status: HttpStatus.OK,
            message: 'Payout berhasil diupdate',
            data: await this.payoutService.update(id, updatePayoutDto),
        };
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async acceptPayout(@Param('id') id: number): Promise<Response> {
        const payout = await this.payoutService.findOne(id);
        const user = await this.userService.findOne(payout.userId);
        await this.userService.update(user.id, { balance: user.balance - payout.amount });
        return {
            status: HttpStatus.OK,
            message: 'Payout berhasil diterima',
            data: await this.payoutService.update(id, { status: 'accepted' }),
        };
    }
}
