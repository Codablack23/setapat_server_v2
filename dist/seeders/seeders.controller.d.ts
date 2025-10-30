import { SeedersService } from './seeders.service';
export declare class SeedersController {
    private readonly seedersService;
    constructor(seedersService: SeedersService);
    seedDesigner(): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            email: string;
            profileId: string;
        } | undefined;
    }>;
    seedAdmin(): void;
    seedDiscount(): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            discount: import("../entities/entity.discount").DiscountEntity;
        } | undefined;
    }>;
    seedAmountDiscount(): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            discount: import("../entities/entity.discount").DiscountEntity;
        } | undefined;
    }>;
    seedSamples(): void;
    seedAppConfig(): void;
}
