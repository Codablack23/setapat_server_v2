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
        const ordersRes = await this.orderRepo.find({
            where,
            relations: {
                pages: {
                    page_resizes: true,
                },
                submissions: true,
                order_assignments: {
                    designer: { user: true },
                },
                order_edits: true,
            },
            order: { created_at: 'DESC' },
        });
        const orders = ordersRes.map((item) => {
            const submissions = this.groupLatestSubmissionsByPage(item);
            return {
                ...item,
                submissions,
            };
        });
        return lib_1.AppResponse.getSuccessResponse({
            data: { orders: this.sortOrders(orders) },
            message: 'Orders retrieved successfully',
        });
    }
    async getOrder(userId, orderId) {
        console.log({ userId, orderId });
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
                revisions: true,
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
        const submissions = this.groupLatestSubmissionsByPage(order);
        console.log({ userId, orderId, submissions, orderDetails });
        return lib_1.AppResponse.getSuccessResponse({
            data: {
                order: {
                    ...orderDetails,
                    conversation,
                    submissions,
                },
            },
            message: 'Order retrieved successfully',
        });
    }
    groupLatestSubmissionsByPage(order) {
        let order_submissions = {};
        order.pages
            .sort((a, b) => a.page_number - b.page_number)
            .forEach((page) => {
            const allPageSubmissions = order.submissions.filter((item) => item.page == page.page_number);
            const pageOnlySubmissions = allPageSubmissions.filter((item) => item.page_type == lib_1.SubmissionPageType.PAGE);
            const resizeOnlySubmissions = allPageSubmissions.filter((item) => item.page_type == lib_1.SubmissionPageType.RESIZE && !!item.resize_page);
            lib_1.designExportFormats.forEach((format) => {
                const exportFormatSubmission = pageOnlySubmissions
                    .filter((s) => s.export_format === format)
                    .sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
                const current = order_submissions[page.page_number.toString()] || {
                    formats: {},
                    resize: {},
                };
                order_submissions = {
                    ...order_submissions,
                    [page.page_number.toString()]: {
                        ...current,
                        formats: {
                            ...current.formats,
                            [format]: exportFormatSubmission.at(-1) ?? undefined,
                        },
                    },
                };
            });
            page.page_resizes
                .sort((a, b) => a.page - b.page)
                .forEach((resizePage) => {
                lib_1.designExportFormats.forEach((format) => {
                    const exportFormatSubmission = resizeOnlySubmissions
                        .filter((s) => s.export_format === format &&
                        s.resize_page == resizePage.page)
                        .sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
                    const pageKey = page.page_number.toString();
                    const resizeKey = resizePage.page.toString();
                    const currentPage = order_submissions[pageKey] || {
                        formats: {},
                        resize: {},
                    };
                    const currentResize = currentPage.resize?.[resizeKey] || {
                        formats: {},
                    };
                    order_submissions = {
                        ...order_submissions,
                        [pageKey]: {
                            ...currentPage,
                            resize: {
                                ...currentPage.resize,
                                [resizeKey]: {
                                    ...currentResize,
                                    formats: {
                                        ...currentResize.formats,
                                        [format]: exportFormatSubmission.at(-1) ?? undefined,
                                    },
                                },
                            },
                        },
                    };
                });
            });
        });
        return order_submissions;
    }
};
exports.DesignerService = DesignerService;
exports.DesignerService = DesignerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DesignerService);
//# sourceMappingURL=designer.service.js.map