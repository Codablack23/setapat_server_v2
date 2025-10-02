import { Module } from '@nestjs/common';
import { SeedersService } from './seeders.service';
import { SeedersController } from './seeders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities';
import { DesignerProfileEntity } from 'src/entities/entity.designer';
import { DiscountEntity } from 'src/entities/entity.discount';
import { DiscountInjectableUtils } from 'src/lib/utils/util.discount';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      DesignerProfileEntity,
      DiscountEntity,
    ]),
  ],
  controllers: [SeedersController],
  providers: [SeedersService, DiscountInjectableUtils],
})
export class SeedersModule {}
