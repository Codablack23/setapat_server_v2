import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SamplesService } from './samples.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/providers';

@Controller('design-samples')
export class SamplesController {
  constructor(private readonly samplesService: SamplesService) {}

  @Get()
  getAllSamples() {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':id/react')
  reactToSamples() {}
}
