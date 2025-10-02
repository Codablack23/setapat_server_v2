import { DesignClass, DesignPackage } from 'src/lib';
export type DesignQuality = 'Good' | 'Better' | 'Best';
type DesignPlan = {
    price: {
        [key in DesignClass]: number;
    };
    revison: number;
    printReady: string;
    format: string[];
    quality: DesignQuality;
    exportResolution: string;
    deliveryTime: number;
    extraPageDesignTime: number;
};
export type DesignPlans = {
    [key in DesignPackage]: DesignPlan;
};
export declare const QUICK_DELIVERY__TIME_SINGLE_PAGE_IN_HRS = 6;
export declare const QUICK_DELIVERY__TIME_PER_PAGE_IN_HRS = 4;
export declare const JWT_EXPIRATION: number;
export declare const ORDER_FORMATS: {
    [key: string]: string[];
};
export type DesignPlanKeys = 'basic' | 'standard' | 'premium';
export declare const DESIGN_PLANS: DesignPlans;
export {};
