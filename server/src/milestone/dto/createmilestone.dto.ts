import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMilestoneDto {
  @IsNotEmpty()
  @IsNumber()
  target: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  description: string;

  user: any;
}
