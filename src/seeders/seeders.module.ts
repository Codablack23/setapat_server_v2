import { Module } from '@nestjs/common';
import { SeedersService } from './seeders.service';
import { SeedersController } from './seeders.controller';

@Module({
  controllers: [SeedersController],
  providers: [SeedersService],
})
export class SeedersModule {}
