import { FaqsService } from './faqs.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
export declare class FaqsController {
    private readonly faqsService;
    constructor(faqsService: FaqsService);
    create(createFaqDto: CreateFaqDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFaqDto: UpdateFaqDto): string;
    remove(id: string): string;
}
