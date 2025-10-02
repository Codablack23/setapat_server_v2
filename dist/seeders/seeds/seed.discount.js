"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneYear30PercentDiscountSeed = void 0;
const entity_discount_1 = require("../../entities/entity.discount");
exports.oneYear30PercentDiscountSeed = {
    description: '30% discount valid for 1 year',
    type: entity_discount_1.DiscountType.PERCENTAGE,
    amount: 30,
    duration_hours: 24 * 365,
    is_one_time: false,
    is_active: true,
    starts_at: new Date(),
};
//# sourceMappingURL=seed.discount.js.map