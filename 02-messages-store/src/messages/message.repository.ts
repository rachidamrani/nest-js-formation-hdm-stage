import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    const content = await readFile('messages.json', 'utf-8');
    return JSON.parse(content).find((m) => m.id === +id);
  }

  async findAll() {
    const content = await readFile('messages.json', 'utf-8');
    return JSON.parse(content);
  }

  async create(message: string) {
    const content = await readFile('messages.json', 'utf-8');
    const messages = JSON.parse(content);
    const newMessage = {
      id: Math.floor(Math.random() * 999),
      content: message,
    };
    messages.push(newMessage);
    await writeFile('messages.json', JSON.stringify(messages));
    return newMessage;
  }
}
