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
const lib_1 = require("../lib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
const lib_2 = require("../lib");
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
                        lib_2.OrderStatus.IN_PROGRESS,
                        lib_2.OrderStatus.PENDING,
                        lib_2.OrderStatus.EDIT,
                    ]),
                },
                {
                    ...baseWhere,
                    status: (0, typeorm_2.Not)(lib_2.OrderStatus.DRAFT),
                    order_edits: { status: lib_2.OrderEditStatus.IN_PROGRESS },
                },
            ];
        }
        else if (query === 'withdrawal') {
            where = [
                {
                    status: (0, typeorm_2.Not)(lib_2.OrderStatus.DRAFT),
                    order_assignments: {
                        ...baseWhere.order_assignments,
                        status: lib_2.OrderAssignmentStatus.WITHDRAWN,
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
        return lib_2.AppResponse.getSuccessResponse({
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
                pages: {
                    page_resizes: true,
                },
                brief_attachments: true,
                submissions: true,
                conversations: true,
                order_edits: {
                    pages: true,
                },
                order_assignments: {
                    designer: {
                        user: true,
                    },
                },
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
        const revisionsPerPage = await this.getPageRevisionsCount(order?.id);
        return lib_2.AppResponse.getSuccessResponse({
            data: {
                order: {
                    ...orderDetails,
                    conversation,
                    revisions_per_page: revisionsPerPage,
                },
            },
            message: 'Order retrieved successfully',
        });
    }
    async getPageRevisionsCount(orderId) {
        try {
            const order = await this.orderRepo.findOne({
                where: { id: orderId },
                relations: {
                    pages: { page_resizes: true },
                    brief_attachments: true,
                    submissions: true,
                    conversations: true,
                    order_edits: { pages: true },
                    resize_extras: { order_page: true },
                },
                order: { created_at: 'DESC' },
            });
            if (!order)
                return {};
            const revisionsPerPage = {};
            const orderRevision = lib_1.designPlans[order.design_package ?? lib_1.DesignPackage.BASIC].revison;
            const pageSubmissions = (order.submissions ?? []).filter((sub) => sub.page_type === lib_1.SubmissionPageType.PAGE);
            const resizeSubmissions = (order.submissions ?? []).filter((sub) => sub.page_type === lib_1.SubmissionPageType.RESIZE);
            for (const page of order.pages) {
                const pageKey = page.page_number.toString();
                const currentPageSubs = pageSubmissions.filter((sub) => sub.page === page.page_number);
                const resize = {};
                for (const resizeItem of page.page_resizes) {
                    const currentResizeSubs = resizeSubmissions.filter((sub) => sub.page === page.page_number &&
                        sub.resize_page === resizeItem.page);
                    resize[resizeItem.page] = {
                        total: orderRevision,
                        count: Math.max(0, currentResizeSubs.length - 1),
                    };
                }
                revisionsPerPage[pageKey] = {
                    total: orderRevision,
                    count: Math.max(0, currentPageSubs.length - 1),
                    resize,
                };
            }
            return revisionsPerPage;
        }
        catch (error) {
            console.log(`Error occurred while generating page revisions: ${error}`);
            return {};
        }
    }
};
exports.DesignerService = DesignerService;
exports.DesignerService = DesignerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DesignerService);
//# sourceMappingURL=designer.service.js.map