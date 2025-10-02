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
exports.NotificationsService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const entity_notification_1 = require("../entities/entity.notification");
const typeorm_2 = require("typeorm");
const lib_1 = require("../lib");
let NotificationsService = class NotificationsService {
    notificationRepository;
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    async findAll(userId) {
        const notifications = await this.notificationRepository.find({
            where: {
                user: {
                    id: userId,
                },
            },
            relations: {
                order: true,
            },
        });
        return lib_1.AppResponse.getResponse('success', {
            data: {
                notifications,
            },
            message: 'Notifications retrieved successfully',
        });
    }
    async remove(id, userId) {
        const notification = await this.notificationRepository.findOne({
            where: {
                id,
                user: {
                    id: userId,
                },
            },
        });
        if (!notification)
            throw new common_1.BadGatewayException(lib_1.AppResponse.getFailedResponse('Notification does not exists'));
        await this.notificationRepository.delete({ id });
        return lib_1.AppResponse.getSuccessResponse({
            message: 'Notification Deleted successfully',
        });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entity_notification_1.NotificationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map