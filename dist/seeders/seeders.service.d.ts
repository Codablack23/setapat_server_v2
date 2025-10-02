import { DiscountEntity } from './../entities/entity.discount';
import { UserEntity } from 'src/entities';
import { DesignerProfileEntity } from 'src/entities/entity.designer';
import { Repository } from 'typeorm';
import { DiscountInjectableUtils } from 'src/lib/utils/util.discount';
export declare class SeedersService {
    private userRepo;
    private designerRepo;
    private discountRepo;
    private discountUtils;
    constructor(userRepo: Repository<UserEntity>, designerRepo: Repository<DesignerProfileEntity>, discountRepo: Repository<DiscountEntity>, discountUtils: DiscountInjectableUtils);
    seedDesigner(): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            email: string;
            profileId: string;
        } | undefined;
    }>;
    seedDiscount(): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            discount: DiscountEntity;
        } | undefined;
    }>;
}
