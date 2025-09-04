import { Controller, Get, Post } from '@nestjs/common';
import { CommonService } from './common.service';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Post('uploads')
  upload() {}

  @Get('downloads')
  downloads() {}
}
