import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { JwtAuthGuard } from 'src/providers';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { UpdateConversationDto } from './dto/update-conversation.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post(':id/messages')
  create(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationsService.create(createConversationDto);
  }

  @Get(':id/messages')
  findAll() {
    return this.conversationsService.findAll();
  }
}
