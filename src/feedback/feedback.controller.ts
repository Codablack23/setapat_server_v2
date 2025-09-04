/* eslint-disable @typescript-eslint/no-unused-vars */

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

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
