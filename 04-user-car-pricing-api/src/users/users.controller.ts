import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Query,
  NotFoundException,
  Delete,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CreateOrLoginUserDto } from './dtos/create-or-login-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // Signup handler
  @Post('auth/signup')
  async createUser(
    @Body() body: CreateOrLoginUserDto,
    @Session() session: any,
  ) {
    const { email, password } = body;
    const user = await this.authService.signup(email, password);
    session.userId = user.id;

    return user;
  }

  // Signin handler
  @Post('auth/signin')
  async loginUser(@Body() body: CreateOrLoginUserDto, @Session() session: any) {
    const { email, password } = body;
    const user = await this.authService.signin(email, password);
    session.userId = user.id;

    return user;
  }

  // Get the signed in user
  // @Get('/auth/whoami')
  // async whoAmI(@Session() session: any) {
  //   const user = await this.usersService.findOne(session.userId);
  //   if (!user) throw new NotFoundException('There is no user signed in!');
  //   return user;
  // }

  // Get the signed in user
  @Get('/auth/whoami')
  @UseGuards(AuthGuard) // user can't access this route without being signed in
  whoAmI(@CurrentUser() user: User) {
    if (!user) throw new NotFoundException('There is no user signed in!');
    return user;
  }

  // Sign out user
  @Post('/auth/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  // Find a user by id
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user) throw new NotFoundException(`User with id : ${id} not found`);
    return user;
  }

  // Fin all users that have a specific email
  @Get()
  async findAllUsers(@Query('email') email: string) {
    return await this.usersService.find(email);
  }

  // Remove a user by id
  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(+id, body);
  }
}
