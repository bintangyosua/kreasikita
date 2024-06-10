import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { DonationModule } from 'src/donation/donation.module';
import { UsersModule } from 'src/users/users.module';
import { PaymentService } from './payment.service';

@Module({
  controllers: [PaymentController],
  imports: [DonationModule, UsersModule],
  providers: [PaymentService],
})
export class PaymentModule {}
