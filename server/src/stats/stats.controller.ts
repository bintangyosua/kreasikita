import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StatsService } from './stats.service';
import { Response } from 'src/types/response.type';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAll(): Promise<Response> {
    return {
      status: HttpStatus.OK,
      message: 'Data fetched',
      data: await this.statsService.findAll(),
    };
  }

  @Get('by-profile/:username')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getAllByUsername(
    @Param('username') username: string,
  ): Promise<Response> {
    return {
      status: HttpStatus.OK,
      message: 'Data fetched',
      data: await this.statsService.findStatsByUsername(username),
    };
  }
}
