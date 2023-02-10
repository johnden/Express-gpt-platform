import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/sendMessage")
  getStatus(@Query("text") text, @Query("conversationId") conversationId, @Query("messageId") messageId) {
    return this.appService.sendMessage(text, conversationId, messageId);
  }
}
