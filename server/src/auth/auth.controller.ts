import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';
import { ChangePasswordDto } from './dto/changepassword.dto';
import { Response } from 'src/types/response.type';
import { RolesGuard } from './role/roles.guard';
import { Roles } from './role/roles.decorator';
import { Role } from './role/roles.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  validate(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.admin)
  @Get('validate-admin')
  @HttpCode(HttpStatus.OK)
  async validateAdmin(): Promise<Response> {
    return {
      status: HttpStatus.OK,
      message: 'You are an admin',
      data: {
        isAdmin: true,
      },
    };
  }

  @UseGuards(AuthGuard)
  @Patch('change-password')
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @Body() body: ChangePasswordDto,
    @Request() req,
  ): Promise<Response> {
    return {
      status: HttpStatus.OK,
      message: 'Password Updated',
      data: await this.authService.changePassword({
        password: body.password,
        username: req.user.username,
      }),
    };
  }
}
