import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from 'src/iam/auth/dto/sign-up.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Create and save a new user in the database
   * @param username
   * @param email
   * @param password
   * @returns Promise<User>
   */
  async createUser(username: string, email: string, password: string) {
    const user = this.usersRepository.create({ username, email, password });
    return await this.usersRepository.save(user);
  }

  /**
   * Find all users in the database with a given email
   * @param email
   * @returns User[]
   */
  async findUserById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  /**
   * Find a user by its email
   */
  async findUserByEmail(email: string) {
    return await this.usersRepository.findBy({ email });
  }
}
