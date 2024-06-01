import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;

  pfp?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsNotEmpty()
  category: any;
}
