import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
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

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: number ): Promise<Response> {
    return {
      status: HttpStatus.OK,
      message: 'Data fetched',
      data: await this.usersService.findOne(id),
    };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('category/:id')
  @HttpCode(HttpStatus.FOUND)
  async getUserByCategory(@Param('id') categoryId: number ): Promise<Response> {
    return {
      status: HttpStatus.FOUND,
      message: 'Data fetched',
      data: await this.usersService.findManyByCategory(categoryId),
    };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('name/:name')
  @HttpCode(HttpStatus.FOUND)
  async getUserByName(@Param('name') name: string ): Promise<Response> {
    return {
      status: HttpStatus.FOUND,
      message: 'Data fetched',
      data: await this.usersService.findOneByName(name),
    };
  }


  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<Response> {
    return {
      status: HttpStatus.CREATED,
      message: 'User berhasil dibuat',
      data: await this.usersService.create(createUserDto),
    };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Param('id') id: number, @Body() createUserDto: CreateUserDto): Promise<Response> {
    return {
      status: HttpStatus.OK,
      message: 'User berhasil diupdate',
      data: await this.usersService.update(id, createUserDto),
    };
  }
  
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id') id: number): Promise<Response> {
    return {
      status: HttpStatus.OK,
      message: 'User berhasil dihapus',
      data: await this.usersService.remove(id),
    };
  }
}
