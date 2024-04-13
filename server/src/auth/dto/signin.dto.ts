import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    default: 'john',
  })
  username: string;

  @ApiProperty({
    default: 'john123',
  })
  password: string;
}
