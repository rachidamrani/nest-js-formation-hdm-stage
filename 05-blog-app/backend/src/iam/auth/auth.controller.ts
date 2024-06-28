import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SerializeUserResponseInterceptor } from 'src/users/interceptors/serialize/serialize.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @UseInterceptors(SerializeUserResponseInterceptor)
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }
}
