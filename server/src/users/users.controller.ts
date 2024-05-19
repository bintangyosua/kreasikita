import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
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
    if (await this.usersService.findOne(id) === null) {
      throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
    } else if(isNaN(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    } else {
      return {
        status: HttpStatus.OK,
        message: 'Data fetched',
        data: await this.usersService.findOne(id),
      };
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('category/:id')
  @HttpCode(HttpStatus.OK)
  async getUserByCategory(@Param('id') categoryId: number ): Promise<Response> {
    if (await this.usersService.findManyByCategory(categoryId) === null) {
      throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
    } else if(isNaN(categoryId)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    } else {
      return {
        status: HttpStatus.OK,
        message: 'Data fetched',
        data: await this.usersService.findManyByCategory(categoryId),
      };
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('name/:name')
  @HttpCode(HttpStatus.OK)
  async getUserByName(@Param('name') name: string ): Promise<Response> {
    if (await this.usersService.findOneByName(name) === null) {
      throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
    } else {
      return {
        status: HttpStatus.OK,
        message: 'Data fetched',
        data: await this.usersService.findOneByName(name),
      };
    }
  }


  @Post()
  @HttpCode(HttpStatus.OK)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<Response> {
    if (createUserDto.name === null || createUserDto.password === null || createUserDto.email === null) {
      throw new HttpException('Invalid Body', HttpStatus.BAD_REQUEST);
    } else {
      return {
        status: HttpStatus.CREATED,
        message: 'User berhasil dibuat',
        data: await this.usersService.create(createUserDto),
      };
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Param('id') id: number, @Body() createUserDto: CreateUserDto): Promise<Response> {
    if (await this.usersService.findOne(id) === null) {
      throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
    }else if(isNaN(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    } else {
      return {
        status: HttpStatus.OK,
        message: 'User berhasil diupdate',
        data: await this.usersService.update(id, createUserDto),
      };
    }
  }
  
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id') id: number): Promise<Response> {
    if (await this.usersService.findOne(id) === null) {
      throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
    } return {
      status: HttpStatus.OK,
      message: 'User berhasil dihapus',
      data: await this.usersService.remove(id),
    };
  }
}
