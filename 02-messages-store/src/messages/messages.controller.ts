import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private _messagesService: MessagesService) {}
  @Get()
  async listMessages() {
    return await this._messagesService.findAll();
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this._messagesService.findOne(id);

    if (!message) throw new NotFoundException('Message not found');

    return message;
  }

  @Post()
  async createMessage(@Body() body: CreateMessageDto) {
    return await this._messagesService.create(body.content);
  }
}
