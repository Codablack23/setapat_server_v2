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
exports.DesignerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
const lib_1 = require("../lib");
let DesignerService = class DesignerService {
    orderRepo;
    constructor(orderRepo) {
        this.orderRepo = orderRepo;
    }
    sortOrders(orders) {
        return [...orders].sort((a, b) => {
            const aTime = a.last_edited_at?.getTime() ?? a.created_at.getTime();
            const bTime = b.last_edited_at?.getTime() ?? b.created_at.getTime();
            return bTime - aTime;
        });
    }
    async getOrders(userId, query) {
        const baseWhere = {
            order_assignments: {
                designer: { user: { id: userId } },
            },
        };
        let where = baseWhere;
        if (query === 'pending') {
            where = [
                {
                    ...baseWhere,
                    status: (0, typeorm_2.In)([
                        lib_1.OrderStatus.IN_PROGRESS,
                        lib_1.OrderStatus.PENDING,
                        lib_1.OrderStatus.EDIT,
                    ]),
                },
                {
                    ...baseWhere,
                    status: (0, typeorm_2.Not)(lib_1.OrderStatus.DRAFT),
                    order_edits: { status: lib_1.OrderEditStatus.IN_PROGRESS },
                },
            ];
        }
        else if (query === 'withdrawal') {
            where = [
                {
                    status: (0, typeorm_2.Not)(lib_1.OrderStatus.DRAFT),
                    order_assignments: {
                        ...baseWhere.order_assignments,
                        status: lib_1.OrderAssignmentStatus.WITHDRAWN,
                    },
                },
            ];
        }
        const orders = await this.orderRepo.find({
            where,
            relations: {
                order_assignments: {
                    designer: { user: true },
                },
                order_edits: true,
            },
            order: { created_at: 'DESC' },
        });
        return lib_1.AppResponse.getSuccessResponse({
            data: { orders: this.sortOrders(orders) },
            message: 'Orders retrieved successfully',
        });
    }
    async getOrder(userId, orderId) {
        const order = await this.orderRepo.findOne({
            where: {
                id: orderId,
                order_assignments: {
                    designer: {
                        user: {
                            id: userId,
                        },
                    },
                },
            },
            relations: {
                pages: true,
                brief_attachments: true,
                submissions: true,
                conversations: true,
                discount: {
                    discount: true,
                },
                resize_extras: {
                    order_page: true,
                },
            },
            order: { created_at: 'DESC' },
        });
        if (!order)
            throw new common_1.NotFoundException({
                status: 'failed',
                message: 'Sorry the order you are looking for does not exist or may have been deleted',
            });
        const { conversations, ...orderDetails } = order;
        const conversation = conversations[0];
        return lib_1.AppResponse.getSuccessResponse({
            data: {
                order: {
                    ...orderDetails,
                    conversation,
                },
            },
            message: 'Order retrieved successfully',
        });
    }
};
exports.DesignerService = DesignerService;
exports.DesignerService = DesignerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DesignerService);
//# sourceMappingURL=designer.service.js.map