import { FeedbackService } from './feedback.service';
export declare class FeedbackController {
    private readonly feedbackService;
    constructor(feedbackService: FeedbackService);
    createReview(): void;
    getReviews(): void;
    createSuggestion(): void;
    getSuggestions(): void;
    createComplaint(): void;
    getComplaints(): void;
}
