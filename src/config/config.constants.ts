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

export const QUICK_DELIVERY__TIME_SINGLE_PAGE_IN_HRS = 6;
export const QUICK_DELIVERY__TIME_PER_PAGE_IN_HRS = 4;

export const JWT_EXPIRATION = 60 * 60 * 24 * 30;
export const ORDER_FORMATS: {
  [key: string]: string[];
} = {
  basic: ['jpeg', 'png', 'pdf'],
  standard: ['jpeg', 'png', 'pdf', 'ai'],
  premium: ['jpeg', 'png', 'pdf', 'ai', 'svg'],
};

export type DesignPlanKeys = 'basic' | 'standard' | 'premium';

export const DESIGN_PLANS: DesignPlans = {
  [DesignPackage.BASIC]: {
    price: { A: 5000, B: 7500, C: 10000, D: 20000, A1: 3500 },
    revison: 2,
    printReady: 'Yes (PDF)',
    format: ['JPEG', 'PNG'],
    quality: 'Good',
    exportResolution: '150MB',
    deliveryTime: 24,
    extraPageDesignTime: 3,
  },
  [DesignPackage.STANDARD]: {
    price: { A: 7500, B: 11250, C: 15000, D: 30000, A1: 5250 },
    revison: 3,
    printReady: 'Yes (PDF)',
    format: ['JPEG', 'PNG', 'AI'],
    quality: 'Better',
    exportResolution: '200MB',
    deliveryTime: 21,
    extraPageDesignTime: 3,
  },
  [DesignPackage.PREMIUM]: {
    price: { A: 22500, B: 33750, C: 45000, D: 90000, A1: 15750 },
    revison: 4,
    printReady: 'Yes (PDF)',
    format: ['JPEG', 'PNG', 'AI', 'SVG'],
    quality: 'Best',
    exportResolution: '300MB',
    deliveryTime: 18,
    extraPageDesignTime: 3,
  },
};
