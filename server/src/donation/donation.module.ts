import { Module } from '@nestjs/common';
import { DonationController } from './donation.controller';
import { DonationService } from './donation.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import { MilestoneService } from 'src/milestone/milestone.service';

@Module({
  controllers: [DonationController],
  providers: [DonationService, UsersService, MilestoneService],
  exports: [DonationService],
  imports: [PrismaModule],
})
export class DonationModule {}
