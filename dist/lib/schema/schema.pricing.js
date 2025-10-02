"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.designPlans = exports.ORDER_FORMATS = exports.QUICK_DELIVERY__TIME_PER_PAGE_IN_HRS = exports.QUICK_DELIVERY__TIME_SINGLE_PAGE_IN_HRS = exports.fileFormats = exports.RESIZE_COST = void 0;
const enum_1 = require("../enum");
exports.RESIZE_COST = 1000;
exports.fileFormats = ['.jpg', '.jpeg', '.png', '.ai', '.svg', '.pdf'];
exports.QUICK_DELIVERY__TIME_SINGLE_PAGE_IN_HRS = 6;
exports.QUICK_DELIVERY__TIME_PER_PAGE_IN_HRS = 4;
exports.ORDER_FORMATS = {
    [enum_1.DesignPackage.BASIC]: ['jpeg', 'png', 'pdf'],
    [enum_1.DesignPackage.PREMIUM]: ['jpeg', 'png', 'pdf', 'ai'],
    [enum_1.DesignPackage.STANDARD]: ['jpeg', 'png', 'pdf', 'ai', 'svg'],
};
exports.designPlans = {
    [enum_1.DesignPackage.BASIC]: {
        price: { A: 5000, B: 7500, C: 10000, D: 20000, A1: 3500 },
        revison: 2,
        printReady: 'Yes (PDF)',
        format: ['JPEG', 'PNG'],
        quality: 'Good',
        exportResolution: '150MB',
        deliveryTime: 24,
        extraPageDesignTime: 3,
    },
    [enum_1.DesignPackage.STANDARD]: {
        price: { A: 7500, B: 11250, C: 15000, D: 30000, A1: 5250 },
        revison: 3,
        printReady: 'Yes (PDF)',
        format: ['JPEG', 'PNG', 'AI'],
        quality: 'Better',
        exportResolution: '200MB',
        deliveryTime: 21,
        extraPageDesignTime: 3,
    },
    [enum_1.DesignPackage.PREMIUM]: {
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
//# sourceMappingURL=schema.pricing.js.map