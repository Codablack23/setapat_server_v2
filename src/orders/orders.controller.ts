import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  AddDesignBriefDto,
  AddOrderSubmissionsDto,
  CreateOrderReviewDto,
  MakeOrderConfidentialDto,
} from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/providers';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles, UserRoleGuard, UserType, type AuthRequest } from 'src/lib';
import { CreateOrderEditDto } from './dto/create-edit.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Request() req: AuthRequest) {
    return this.ordersService.create(createOrderDto, req.user);
  }

  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.ordersService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.ordersService.findOne(id, req.user.id);
  }

  @UseGuards(UserRoleGuard)
  @Roles(UserType.DESIGNER)
  @Post(':id/submit')
  submitOrder(
    @Request() req: AuthRequest,
    @Param('id') id: string,
    @Body() dto: AddOrderSubmissionsDto,
  ) {
    return this.ordersService.submit(req.user.id, id, dto);
  }

  @Post(':id/complete')
  completeOrder(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.ordersService.complete(req.user.id, id);
  }

  @Patch(':id/design-brief')
  addDesignBrief(
    @Param('id') id: string,
    @Body() designBriefDto: AddDesignBriefDto,
    @Request() req: AuthRequest,
  ) {
    return this.ordersService.addDesignBrief(req.user.id, id, designBriefDto);
  }

  @Post(':id/payment/complete')
  completePayment(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.ordersService.completePayment(id, req.user);
  }

  @UseGuards(UserRoleGuard)
  @Roles(UserType.DESIGNER)
  @Post(':id/commence')
  commenceOrder(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.ordersService.commenceOrder(req.user.id, id);
  }
  @Post(':id/generate-receipt')
  generateReceipt(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.ordersService.generateReceipt(req.user.id, id);
  }
  @Post(':id/review')
  addOrderReview(
    @Request() req: AuthRequest,
    @Param('id') id: string,
    @Body() dto: CreateOrderReviewDto,
  ) {
    return this.ordersService.reviewOrder(req.user.id, id, dto);
  }

  @Patch(':id/make-confidential')
  makeOrderConfidential(
    @Request() req: AuthRequest,
    @Param('id') id: string,
    @Body() dto: MakeOrderConfidentialDto,
  ) {
    return this.ordersService.makeConfidential(req.user.id, id, dto);
  }

  // Edit actions (always body-driven for editId)
  @Get(':id/edit')
  getOrderEditStatus(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.ordersService.getActiveEdit(req.user.id, id);
  }
  // Edit actions (always body-driven for editId)
  @Post(':id/edit')
  createOrderEdit(
    @Param('id') id: string,
    @Body() dto: CreateOrderEditDto,
    @Request() req: AuthRequest,
  ) {
    return this.ordersService.createOrderEdit(req.user.id, id, dto);
  }
  // Edit actions (always body-driven for editId)
  @Post(':id/edit/submit')
  submitOrderEdit(
    @Param('id') id: string,
    @Body() dto: AddOrderSubmissionsDto,
    @Request() req: AuthRequest,
  ) {
    return this.ordersService.submitEdit(req.user.id, id, dto);
  }

  @Post(':id/edit/complete')
  completeOrderEdit(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.ordersService.completeEdit(req.user.id, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.ordersService.remove(id, req.user.id);
  }
}
