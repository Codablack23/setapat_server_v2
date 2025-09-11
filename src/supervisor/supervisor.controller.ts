import { Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { JwtAuthGuard } from 'src/providers';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('supervisor')
export class SupervisorController {
  constructor(private readonly supervisorService: SupervisorService) {}

  @Get('orders')
  getOrders() {}

  @Patch('profile')
  updateProfile() {}

  @Get('statistics')
  getStats() {}

  @Post('profile/setup')
  setupProfile() {}

  @Get('orders/conversations')
  getConversations() {}

  @Get('orders/conversations/:id')
  getConversationDetails() {}
}
