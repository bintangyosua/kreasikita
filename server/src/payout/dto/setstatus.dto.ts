import { IsNotEmpty } from 'class-validator';

export class SetStatusDto {
  @IsNotEmpty()
  username: string;
}
