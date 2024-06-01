import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [PrismaModule,
    MulterModule.register({
      dest: './uploads',
    })
  ],
})
export class UsersModule {}
