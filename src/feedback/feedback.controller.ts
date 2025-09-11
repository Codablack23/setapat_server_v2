/* eslint-disable @typescript-eslint/no-unused-vars */

import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/providers';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  // Reviews
  @Post('reviews')
  createReview() {}

  @Get('reviews')
  getReviews() {}

  // Suggestions
  @Post('suggestions')
  createSuggestion() {}

  @Get('suggestions')
  getSuggestions() {}

  // Complaints
  @Post('complaints')
  createComplaint() {}

  @Get('complaints')
  getComplaints() {}
}
