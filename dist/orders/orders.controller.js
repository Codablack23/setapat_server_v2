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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const providers_1 = require("../providers");
const swagger_1 = require("@nestjs/swagger");
const lib_1 = require("../lib");
const create_edit_dto_1 = require("./dto/create-edit.dto");
let OrdersController = class OrdersController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    create(createOrderDto, req) {
        return this.ordersService.create(createOrderDto, req.user);
    }
    findAll(req) {
        return this.ordersService.findAll(req.user);
    }
    findOne(id, req) {
        return this.ordersService.findOne(id, req.user.id);
    }
    submitOrder(req, id, dto) {
        return this.ordersService.submit(req.user.id, id, dto);
    }
    completeOrder(id, req) {
        return this.ordersService.complete(req.user.id, id);
    }
    addDesignBrief(id, designBriefDto, req) {
        return this.ordersService.addDesignBrief(req.user.id, id, designBriefDto);
    }
    updateDesignBrief(id, designBriefDto, req) {
        return this.ordersService.addDesignBrief(req.user.id, id, designBriefDto, true);
    }
    completePayment(id, req) {
        return this.ordersService.completePayment(id, req.user);
    }
    commenceOrder(id, req) {
        return this.ordersService.commenceOrder(req.user.id, id);
    }
    generateReceipt(id, req) {
        return this.ordersService.generateReceipt(req.user.id, id);
    }
    addOrderReview(req, id, dto) {
        return this.ordersService.reviewOrder(req.user.id, id, dto);
    }
    makeOrderConfidential(req, id, dto) {
        return this.ordersService.makeConfidential(req.user.id, id, dto);
    }
    getOrderEditStatus(id, req) {
        return this.ordersService.getActiveEdit(req.user.id, id);
    }
    createOrderEdit(id, dto, req) {
        return this.ordersService.createOrderEdit(req.user.id, id, dto);
    }
    submitOrderEdit(id, dto, req) {
        return this.ordersService.submitEdit(req.user.id, id, dto);
    }
    completeOrderEdit(id, req, dto) {
        return this.ordersService.completeEdit(req.user.id, dto);
    }
    remove(id, req) {
        return this.ordersService.remove(id, req.user.id);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(lib_1.UserRoleGuard),
    (0, lib_1.Roles)(lib_1.UserType.DESIGNER),
    (0, common_1.Post)(':id/submit'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_order_dto_1.AddOrderSubmissionsDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "submitOrder", null);
__decorate([
    (0, common_1.Post)(':id/complete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "completeOrder", null);
__decorate([
    (0, common_1.Patch)(':id/design-brief'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.AddDesignBriefDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "addDesignBrief", null);
__decorate([
    (0, common_1.Patch)(':id/update-design-brief'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.AddDesignBriefDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "updateDesignBrief", null);
__decorate([
    (0, common_1.Post)(':id/payment/complete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "completePayment", null);
__decorate([
    (0, common_1.UseGuards)(lib_1.UserRoleGuard),
    (0, lib_1.Roles)(lib_1.UserType.DESIGNER),
    (0, common_1.Post)(':id/commence'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "commenceOrder", null);
__decorate([
    (0, common_1.Post)(':id/generate-receipt'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "generateReceipt", null);
__decorate([
    (0, common_1.Post)(':id/review'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_order_dto_1.CreateOrderReviewDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "addOrderReview", null);
__decorate([
    (0, common_1.Patch)(':id/make-confidential'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_order_dto_1.MakeOrderConfidentialDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "makeOrderConfidential", null);
__decorate([
    (0, common_1.Get)(':id/edit'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "getOrderEditStatus", null);
__decorate([
    (0, common_1.Post)(':id/edit'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_edit_dto_1.CreateOrderEditDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "createOrderEdit", null);
__decorate([
    (0, common_1.Post)(':id/edit/submit'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.AddEditSubmissionsDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "submitOrderEdit", null);
__decorate([
    (0, common_1.Post)(':id/edit/complete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_order_dto_1.CompleteEditDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "completeOrderEdit", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "remove", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.UseGuards)(providers_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map