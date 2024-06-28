import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // See if email is already in use
    const users = await this.usersService.find(email);

    if (users.length > 0) {
      throw new BadRequestException(`Email ${email} already in use`);
    }

    // Hash the password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hashedPassword = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and the salt together
    const passwordResult = salt + '.' + hashedPassword.toString('hex');

    // Create a new user and save it
    const user = await this.usersService.create(email, passwordResult);
    // return the user

    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) throw new NotFoundException('User not found');

    const [salt, storedHashedPassword] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHashedPassword !== hash.toString('hex'))
      throw new BadRequestException('bad password');

    return user;
  }
}
