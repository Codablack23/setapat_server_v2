"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedersService = void 0;
const entity_discount_1 = require("./../entities/entity.discount");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const entity_designer_1 = require("../entities/entity.designer");
const lib_1 = require("../lib");
const typeorm_2 = require("typeorm");
const seeds_1 = require("./seeds");
const config_1 = require("../config");
const util_discount_1 = require("../lib/utils/util.discount");
let SeedersService = class SeedersService {
    userRepo;
    designerRepo;
    discountRepo;
    discountUtils;
    constructor(userRepo, designerRepo, discountRepo, discountUtils) {
        this.userRepo = userRepo;
        this.designerRepo = designerRepo;
        this.discountRepo = discountRepo;
        this.discountUtils = discountUtils;
    }
    async seedDesigner() {
        const designers = await this.designerRepo.find({
            where: {
                role: lib_1.DesignerRole.SUPER_DESIGNER,
            },
        });
        if (designers.length > 0) {
            throw new common_1.ForbiddenException(lib_1.AppResponse.getFailedResponse('Super designer has already been seeded '));
        }
        const designerUser = this.userRepo.create({
            firstname: seeds_1.superDesignerSeed.firstname,
            lastname: seeds_1.superDesignerSeed.lastname,
            email: seeds_1.superDesignerSeed.email,
            password: config_1.ENVIRONMENT.SEEDERS.SUPER_DESIGNER_PASSWORD,
            user_type: lib_1.UserType.DESIGNER,
            gender: lib_1.Gender.MALE,
        });
        await this.userRepo.save(designerUser);
        const designerProfile = this.designerRepo.create({
            role: lib_1.DesignerRole.SUPER_DESIGNER,
            opens_at: seeds_1.superDesignerSeed.opens_at,
            closes_at: seeds_1.superDesignerSeed.closes_at,
            designer_specifications: seeds_1.superDesignerSeed.designer_specifications,
            working_days: seeds_1.superDesignerSeed.working_days,
            resume_link: seeds_1.superDesignerSeed.resume_link,
            portfolio_link: seeds_1.superDesignerSeed.portfolio_link,
            user: designerUser,
        });
        await this.designerRepo.save(designerProfile);
        return lib_1.AppResponse.getSuccessResponse({
            message: 'Designer account seeded successfully',
            data: {
                email: designerUser.email,
                profileId: designerProfile.id,
            },
        });
    }
    async seedDiscount() {
        const defaultDiscount = await this.discountRepo.find({});
        if (defaultDiscount.length > 0) {
            throw new common_1.ForbiddenException(lib_1.AppResponse.getFailedResponse('Default Discount has already been generated'));
        }
        const discountCode = await this.discountUtils.generateNextDiscountCode();
        const newDiscount = this.discountRepo.create({
            ...seeds_1.oneYear30PercentDiscountSeed,
            code: discountCode,
        });
        const discount = await this.discountRepo.save(newDiscount);
        return lib_1.AppResponse.getSuccessResponse({
            message: 'Discount seeded successfully',
            data: {
                discount,
            },
        });
    }
};
exports.SeedersService = SeedersService;
exports.SeedersService = SeedersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entity_designer_1.DesignerProfileEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(entity_discount_1.DiscountEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        util_discount_1.DiscountInjectableUtils])
], SeedersService);
//# sourceMappingURL=seeders.service.js.map