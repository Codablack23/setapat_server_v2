import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/providers';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  // Base order actions
  @Post(':id/submit')
  submitOrder(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.ordersService.submit(+id, dto);
  }

  @Post(':id/complete')
  completeOrder(@Param('id') id: string) {
    return this.ordersService.complete(+id);
  }

  @Patch(':id/design-brief')
  addDesignBrief(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.ordersService.update(+id, dto);
  }
  @Post(':id/payment/complete')
  completePayment(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.ordersService.update(+id, dto);
  }
  @Post(':id/commence')
  commenceOrder(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.ordersService.update(+id, dto);
  }
  @Post(':id/generate-receipt')
  generateReceipt(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.ordersService.update(+id, dto);
  }
  @Post(':id/review')
  addOrderReview(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.ordersService.update(+id, dto);
  }

  @Post(':id/make-confidential')
  makeOrderConfidential(@Param('id') id: string) {
    return this.ordersService.makeConfidential(+id);
  }

  // Edit actions (always body-driven for editId)
  @Post(':id/edit')
  createOrderEdit(
    @Param('id') id: string,
    @Body() dto: { editId: number; data: UpdateOrderDto },
  ) {
    return this.ordersService.submitEdit(+id, dto.editId, dto.data);
  }
  // Edit actions (always body-driven for editId)
  @Post(':id/edit/submit')
  submitOrderEdit(
    @Param('id') id: string,
    @Body() dto: { editId: number; data: UpdateOrderDto },
  ) {
    return this.ordersService.submitEdit(+id, dto.editId, dto.data);
  }

  @Post(':id/edit/complete')
  completeOrderEdit(@Param('id') id: string, @Body() dto: { editId: number }) {
    return this.ordersService.completeEdit(+id, dto.editId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
