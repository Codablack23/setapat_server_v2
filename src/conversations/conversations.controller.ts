import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { SendMessageDto } from './dto/create-conversation.dto';
import { JwtAuthGuard } from 'src/providers';
import { ApiBearerAuth } from '@nestjs/swagger';
import type { AuthRequest } from 'src/lib';
// import { UpdateConversationDto } from './dto/update-conversation.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post(':id/messages')
  create(
    @Param('id') id: string,
    @Request() req: AuthRequest,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    return this.conversationsService.sendMessage(req.user, id, sendMessageDto);
  }

  @Get(':id/messages')
  findAll(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.conversationsService.getMessages(req.user.id, id);
  }
}
