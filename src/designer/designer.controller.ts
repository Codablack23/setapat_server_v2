import { Controller, Get, Patch, Post } from '@nestjs/common';
import { DesignerService } from './designer.service';

@Controller('designer')
export class DesignerController {
  constructor(private readonly designerService: DesignerService) {}

  @Get('orders')
  getOrders() {}

  @Patch('profile')
  updateProfile() {}

  @Get('orders/:id')
  getConversations() {}

  @Get('statistics')
  getStats() {}

  @Post('profile/setup')
  setupProfile() {}

  @Post('apply-for-promotion')
  applyForPromotion() {}
}
