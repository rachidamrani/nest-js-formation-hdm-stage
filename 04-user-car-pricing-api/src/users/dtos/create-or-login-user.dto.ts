import { IsEmail, IsString } from 'class-validator';

export class CreateOrLoginUserDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
