import { Controller, Get, Patch, Post } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';

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
