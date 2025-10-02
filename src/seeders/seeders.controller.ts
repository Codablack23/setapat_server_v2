import { Controller, Post } from '@nestjs/common';
import { SeedersService } from './seeders.service';

@Controller('seeders')
export class SeedersController {
  constructor(private readonly seedersService: SeedersService) {}

  @Post('designer')
  seedDesigner() {
    return this.seedersService.seedDesigner();
  }

  @Post('admin')
  seedAdmin() {}

  @Post('discounts')
  seedDiscount() {
    return this.seedersService.seedDiscount();
  }

  @Post('samples')
  seedSamples() {}

  @Post('config')
  seedAppConfig() {}
}
