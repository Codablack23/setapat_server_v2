import { Module } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { DiscountsController } from './discounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsedDiscountEntity } from 'src/entities/entity.used_discount';
import { DiscountEntity } from 'src/entities/entity.discount';
import { OrderEntity } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsedDiscountEntity, DiscountEntity, OrderEntity]),
  ],
  controllers: [DiscountsController],
  providers: [DiscountsService],
})
export class DiscountsModule {}
