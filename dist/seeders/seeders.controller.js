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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedersController = void 0;
const common_1 = require("@nestjs/common");
const seeders_service_1 = require("./seeders.service");
let SeedersController = class SeedersController {
    seedersService;
    constructor(seedersService) {
        this.seedersService = seedersService;
    }
    seedDesigner() {
        return this.seedersService.seedDesigner();
    }
    seedAdmin() { }
    seedDiscount() {
        return this.seedersService.seedDiscount();
    }
    seedSamples() { }
    seedAppConfig() { }
};
exports.SeedersController = SeedersController;
__decorate([
    (0, common_1.Post)('designer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SeedersController.prototype, "seedDesigner", null);
__decorate([
    (0, common_1.Post)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SeedersController.prototype, "seedAdmin", null);
__decorate([
    (0, common_1.Post)('discounts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SeedersController.prototype, "seedDiscount", null);
__decorate([
    (0, common_1.Post)('samples'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SeedersController.prototype, "seedSamples", null);
__decorate([
    (0, common_1.Post)('config'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SeedersController.prototype, "seedAppConfig", null);
exports.SeedersController = SeedersController = __decorate([
    (0, common_1.Controller)('seeders'),
    __metadata("design:paramtypes", [seeders_service_1.SeedersService])
], SeedersController);
//# sourceMappingURL=seeders.controller.js.map