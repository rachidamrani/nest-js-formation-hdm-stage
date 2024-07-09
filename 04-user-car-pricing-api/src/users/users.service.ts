import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // Create a new user
  async create(email: string, password: string) {
    const user = this.usersRepository.create({ email, password });
    return await this.usersRepository.save(user);
  }

  // Find a user by its id
  async findOne(id: number) {
    if (!id) return null;
    return await this.usersRepository.findOneBy({ id });
  }

  // Find a user by its email
  async find(email: string) {
    return await this.usersRepository.findBy({ email });
  }

  // Update a user
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException(`User with id : ${id} not found`);

    Object.assign(user, attrs);

    return this.usersRepository.save(user);
  }

  // Delete a user
  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException(`User with id : ${id} not found`);

    return await this.usersRepository.remove(user);
  }
}
