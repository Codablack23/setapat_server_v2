import { Controller, Post } from '@nestjs/common';
import { SeedersService } from './seeders.service';

@Controller('seeders')
export class SeedersController {
  constructor(private readonly seedersService: SeedersService) {}

  @Post('designer')
  seedDesigner() {}

  @Post('admin')
  seedAdmin() {}

  @Post('samples')
  seedSamples() {}

  @Post('config')
  seedAppConfig() {}
}
