import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DesignerService } from './designer.service';
import type { OrdersQuery } from './designer.service';
import { JwtAuthGuard } from 'src/providers';
import { ApiBearerAuth } from '@nestjs/swagger';
import type { AuthRequest } from 'src/lib';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('designer')
export class DesignerController {
  constructor(private readonly designerService: DesignerService) {}

  @Get('orders')
  getOrders(@Request() req: AuthRequest, @Query('status') status: OrdersQuery) {
    return this.designerService.getOrders(req.user.id, status);
  }

  @Patch('profile')
  updateProfile() {}

  @Get('orders/:id')
  getConversations(@Request() req: AuthRequest, @Param('id') id: string) {
    return this.designerService.getOrder(req.user.id, id);
  }

  @Get('statistics')
  getStats() {}

  @Post('profile/setup')
  setupProfile() {}

  @Post('apply-for-promotion')
  applyForPromotion() {}
}
