import { Module } from '@nestjs/common';
import { PayoutService } from './payout.service';
import { PayoutController } from './payout.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [PayoutService,UsersService],
  controllers: [PayoutController],
  imports: [PrismaModule],
})
export class PayoutModule {}
