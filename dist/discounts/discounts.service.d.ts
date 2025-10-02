import { ApplyDiscountDto, CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { DiscountEntity } from 'src/entities/entity.discount';
import { Repository } from 'typeorm';
import { UsedDiscountEntity } from 'src/entities/entity.used_discount';
import { OrderEntity } from 'src/entities';
export declare class DiscountsService {
    private discountRepo;
    private usedDiscountRepo;
    private orderRepo;
    constructor(discountRepo: Repository<DiscountEntity>, usedDiscountRepo: Repository<UsedDiscountEntity>, orderRepo: Repository<OrderEntity>);
    create(createDiscountDto: CreateDiscountDto): string;
    findAll(): string;
    findOne(code: string): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            voucher: DiscountEntity;
        } | undefined;
    }>;
    applyDiscount(code: string, applyDiscountDto: ApplyDiscountDto): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            voucher: DiscountEntity;
        } | undefined;
    }>;
    update(id: number, updateDiscountDto: UpdateDiscountDto): string;
    remove(id: number): string;
}
