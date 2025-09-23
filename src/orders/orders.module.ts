import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  OrderBriefAttachmentEntity,
  OrderEntity,
  OrderPageEntity,
  OrderResizeExtraEntity,
  OrderSubmissionEntity,
} from 'src/entities';
import { OrdersUtil } from 'src/lib';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderPageEntity,
      OrderSubmissionEntity,
      OrderResizeExtraEntity,
      OrderBriefAttachmentEntity,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersUtil],
})
export class OrdersModule {}
