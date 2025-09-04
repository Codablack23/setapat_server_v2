import { Controller, Get, Post } from '@nestjs/common';
import { SamplesService } from './samples.service';

@Controller('design-samples')
export class SamplesController {
  constructor(private readonly samplesService: SamplesService) {}

  @Get()
  getAllSamples() {}

  @Post(':id/react')
  reactToSamples() {}
}
