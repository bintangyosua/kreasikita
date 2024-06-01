import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { DonationModule } from './donation/donation.module';
import { PayoutModule } from './payout/payout.module';
import { PaymentModule } from './payment/payment.module';
import { MilestoneModule } from './milestone/milestone.module';


@Module({
  imports: [UsersModule, AuthModule, PrismaModule, CategoryModule, DonationModule, PayoutModule, PaymentModule, MilestoneModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
