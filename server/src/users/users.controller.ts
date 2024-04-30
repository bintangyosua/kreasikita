import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'src/types/response.type';
import { UsersService } from './users.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createuser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<Response> {
    return {
      status: HttpStatus.OK,
      message: 'Data fetched',
      data: await this.usersService.findAll(),
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<Response> {
    return {
      status: HttpStatus.CREATED,
      message: 'User berhasil dibuat',
      data: this.usersService.create(createUserDto),
    };
  }
}
