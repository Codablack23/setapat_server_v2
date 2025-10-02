import { DesignClass, DesignPackage } from '../enum';
export declare const RESIZE_COST = 1000;
export type DesignQuality = 'Good' | 'Better' | 'Best';
export declare const fileFormats: string[];
export declare const QUICK_DELIVERY__TIME_SINGLE_PAGE_IN_HRS = 6;
export declare const QUICK_DELIVERY__TIME_PER_PAGE_IN_HRS = 4;
export declare const ORDER_FORMATS: {
    [key in DesignPackage]: string[];
};
interface DesignPlan {
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
}
export type DesignPlans = {
    [key in DesignPackage]: DesignPlan;
};
export type DesignPlanKeys = 'basic' | 'standard' | 'premium';
export declare const designPlans: DesignPlans;
export {};
