import { DiscountsService } from './discounts.service';
import { ApplyDiscountDto, CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
export declare class DiscountsController {
    private readonly discountsService;
    constructor(discountsService: DiscountsService);
    create(createDiscountDto: CreateDiscountDto): string;
    findAll(): string;
    findOne(id: string): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            voucher: import("../entities/entity.discount").DiscountEntity;
        } | undefined;
    }>;
    update(id: string, updateDiscountDto: UpdateDiscountDto): string;
    appyDiscount(id: string, applyDiscountDto: ApplyDiscountDto): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            voucher: import("../entities/entity.discount").DiscountEntity;
        } | undefined;
    }>;
    remove(id: string): string;
}
