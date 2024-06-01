import { Module } from '@nestjs/common';
import { MilestoneService } from './milestone.service';
import { MilestoneController } from './milestone.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [MilestoneService,UsersService],
  controllers: [MilestoneController],
  imports: [PrismaModule],

})
export class MilestoneModule {}
