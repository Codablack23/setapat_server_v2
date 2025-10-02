"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedersModule = void 0;
const common_1 = require("@nestjs/common");
const seeders_service_1 = require("./seeders.service");
const seeders_controller_1 = require("./seeders.controller");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const entity_designer_1 = require("../entities/entity.designer");
const entity_discount_1 = require("../entities/entity.discount");
const util_discount_1 = require("../lib/utils/util.discount");
let SeedersModule = class SeedersModule {
};
exports.SeedersModule = SeedersModule;
exports.SeedersModule = SeedersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.UserEntity,
                entity_designer_1.DesignerProfileEntity,
                entity_discount_1.DiscountEntity,
            ]),
        ],
        controllers: [seeders_controller_1.SeedersController],
        providers: [seeders_service_1.SeedersService, util_discount_1.DiscountInjectableUtils],
    })
], SeedersModule);
//# sourceMappingURL=seeders.module.js.map