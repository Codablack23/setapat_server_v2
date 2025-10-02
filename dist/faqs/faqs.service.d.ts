import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
export declare class FaqsService {
    create(createFaqDto: CreateFaqDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateFaqDto: UpdateFaqDto): string;
    remove(id: number): string;
}
