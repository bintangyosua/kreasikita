import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { BankService } from './bank.service';
import { Response } from 'src/types/response.type';

@Controller('banks')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Response> {
    return {
      status: HttpStatus.OK,
      message: 'Data fetched',
      data: await this.bankService.findAll(),
    };
  }
}
