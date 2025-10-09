import { OrderEntity } from './../entities/entity.order';
import { Module } from '@nestjs/common';
import { DesignerService } from './designer.service';
import { DesignerController } from './designer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  controllers: [DesignerController],
  providers: [DesignerService],
})
export class DesignerModule {}
