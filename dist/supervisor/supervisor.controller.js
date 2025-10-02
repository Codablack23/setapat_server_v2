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
exports.SupervisorController = void 0;
const common_1 = require("@nestjs/common");
const supervisor_service_1 = require("./supervisor.service");
const providers_1 = require("../providers");
const swagger_1 = require("@nestjs/swagger");
let SupervisorController = class SupervisorController {
    supervisorService;
    constructor(supervisorService) {
        this.supervisorService = supervisorService;
    }
    getOrders() { }
    updateProfile() { }
    getStats() { }
    setupProfile() { }
    getConversations() { }
    getConversationDetails() { }
};
exports.SupervisorController = SupervisorController;
__decorate([
    (0, common_1.Get)('orders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SupervisorController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Patch)('profile'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SupervisorController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('statistics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SupervisorController.prototype, "getStats", null);
__decorate([
    (0, common_1.Post)('profile/setup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SupervisorController.prototype, "setupProfile", null);
__decorate([
    (0, common_1.Get)('orders/conversations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SupervisorController.prototype, "getConversations", null);
__decorate([
    (0, common_1.Get)('orders/conversations/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SupervisorController.prototype, "getConversationDetails", null);
exports.SupervisorController = SupervisorController = __decorate([
    (0, common_1.UseGuards)(providers_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('supervisor'),
    __metadata("design:paramtypes", [supervisor_service_1.SupervisorService])
], SupervisorController);
//# sourceMappingURL=supervisor.controller.js.map