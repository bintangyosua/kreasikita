import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PayoutService } from './payout.service';
import { Response } from 'src/types/response.type';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePayoutDto } from './dto/createpayout.dto';
import { UsersService } from 'src/users/users.service';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/roles.enum';
import { RolesGuard } from 'src/auth/role/roles.guard';

class PayoutStatus {
  status: string;
}
@Controller('payouts')
export class PayoutController {
  constructor(
    private readonly payoutService: PayoutService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.admin)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getPayout(): Promise<Response> {
    return {
      status: HttpStatus.OK,
      message: 'Data Fetched',
      data: await this.payoutService.findAll(),
    };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('by-username')
  @HttpCode(HttpStatus.OK)
  async getPayoutByUsername(@Req() req): Promise<Response> {
    return {
      status: HttpStatus.OK,
      message: 'Data Fetched',
      data: await this.payoutService.findManyByUsername(req.user.username),
    };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async newPayout(@Body() createPayoutDto: CreatePayoutDto): Promise<Response> {
    const payout = await this.payoutService.create(createPayoutDto);
    const user = await this.userService.findOneByUsername(payout.username);
    if (user.balance < payout.amount) {
      await this.payoutService.remove(payout.id);
      throw new HttpException('Saldo tidak mencukupi', HttpStatus.BAD_REQUEST);
    } else if (user === undefined) {
      await this.payoutService.remove(payout.id);
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    } else {
      return {
        status: HttpStatus.CREATED,
        message: 'Payout berhasil dibuat',
        data: payout,
      };
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post(':id')
  @HttpCode(HttpStatus.OK)
  async updatePayout(
    @Param('id') id: number,
    @Body() updatePayoutDto: CreatePayoutDto,
  ): Promise<Response> {
    if ((await this.payoutService.findOne(id)) === undefined) {
      throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
    } else {
      return {
        status: HttpStatus.OK,
        message: 'Payout berhasil diupdate',
        data: await this.payoutService.update(id, updatePayoutDto),
      };
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async statusPayout(
    @Param('id') id: number,
    @Body() status: PayoutStatus,
  ): Promise<Response> {
    const payout = await this.payoutService.findOne(id);
    const user = await this.userService.findOneByUsername(payout.username);
    if (status.status === 'approved') {
      await this.userService.update(user.id, {
        balance: user.balance - payout.amount,
      });
      return {
        status: HttpStatus.OK,
        message: 'Payout berhasil diapprove',
        data: await this.payoutService.update(id, { status: 'approved' }),
      };
    } else if (status.status === 'rejected') {
      return {
        status: HttpStatus.OK,
        message: 'Payout berhasil direject',
        data: await this.payoutService.update(id, { status: 'rejected' }),
      };
    } else {
      throw new HttpException('Invalid Status', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getpayoutById(@Param('id') id: number): Promise<Response> {
    if ((await this.payoutService.findOne(id)) === undefined) {
      throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
    } else if (isNaN(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    } else {
      return {
        status: HttpStatus.OK,
        message: 'Data Fetched',
        data: await this.payoutService.findOne(id),
      };
    }
  }
}
