import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { DonationModule } from 'src/donation/donation.module';

@Module({
  controllers: [PaymentController],
  imports: [DonationModule],
})
export class PaymentModule {}
