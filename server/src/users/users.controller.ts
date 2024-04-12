import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'src/types/response.type';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<Response> {
    return {
      status: HttpStatus.OK,
      message: 'Data fetched',
      data: await this.usersService.findAll(),
    };
  }
}
