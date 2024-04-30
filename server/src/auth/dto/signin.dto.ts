import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @ApiProperty({
    default: 'bintang@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    default: 'john123',
  })
  password: string;
}
