import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './message.repository';

@Module({
  providers: [MessagesService, MessagesRepository], // classes that can be used as dependencies for other classes
  controllers: [MessagesController],
})
export class MessagesModule {}
