import { Module } from '@nestjs/common';
import { PayoutService } from './payout.service';
import { PayoutController } from './payout.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import { RolesGuard } from 'src/auth/role/roles.guard';

@Module({
  providers: [PayoutService,UsersService,{
    provide : 'AppGuard',
    useClass : RolesGuard
  }],
  controllers: [PayoutController],
  imports: [PrismaModule],
})
export class PayoutModule {}
