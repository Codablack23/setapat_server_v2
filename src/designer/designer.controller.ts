import { Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { DesignerService } from './designer.service';
import { JwtAuthGuard } from 'src/providers';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
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
