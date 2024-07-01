import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('https://kreasikita.vercel.app', 302)
  getHello() {
    return {
      message: 'Hello',
    };
  }
}
