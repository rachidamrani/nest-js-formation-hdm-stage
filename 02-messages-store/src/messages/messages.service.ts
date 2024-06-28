import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './message.repository';

@Injectable()
export class MessagesService {
  constructor(private _messagesRepository: MessagesRepository) {}

  async findOne(id: string) {
    return await this._messagesRepository.findOne(id);
  }
  async findAll() {
    return await this._messagesRepository.findAll();
  }
  async create(message: string) {
    return await this._messagesRepository.create(message);
  }
}
