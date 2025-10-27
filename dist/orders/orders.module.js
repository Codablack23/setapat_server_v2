"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const entity_order_reviews_1 = require("../entities/entity.order_reviews");
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const orders_controller_1 = require("./orders.controller");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const lib_1 = require("../lib");
const entity_notification_1 = require("../entities/entity.notification");
const entity_designer_1 = require("../entities/entity.designer");
const entity_order_assignments_1 = require("../entities/entity.order_assignments");
const entity_order_receipts_1 = require("../entities/entity.order_receipts");
const entity_order_edits_1 = require("../entities/entity.order_edits");
const entity_edit_page_1 = require("../entities/entity.edit_page");
const entity_conversations_1 = require("../entities/entity.conversations");
const entity_participants_1 = require("../entities/entity.participants");
const entity_messages_1 = require("../entities/entity.messages");
const entity_message_revisions_1 = require("../entities/entity.message_revisions");
const entity_revisions_1 = require("../entities/entity.revisions");
const socket_module_1 = require("../socket/socket.module");
const socket_gateway_1 = require("../socket/socket.gateway");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.OrderEntity,
                entities_1.OrderPageEntity,
                entities_1.OrderSubmissionEntity,
                entities_1.OrderResizeExtraEntity,
                entity_notification_1.NotificationEntity,
                entity_designer_1.DesignerProfileEntity,
                entity_order_assignments_1.OrderAssignmentEntity,
                entities_1.OrderBriefAttachmentEntity,
                entity_order_reviews_1.OrderReviewEntity,
                entity_order_receipts_1.OrderReceiptEntity,
                entity_order_edits_1.OrderEditEntity,
                entity_edit_page_1.OrderEditPageEntity,
                entity_conversations_1.ConversationEntity,
                entity_participants_1.ConversationParticipantEntity,
                entity_messages_1.MessageEntity,
                entity_revisions_1.SubmissionRevisions,
                entity_message_revisions_1.MessageRevisionEntity,
            ]),
            socket_module_1.SocketModule,
        ],
        controllers: [orders_controller_1.OrdersController],
        providers: [orders_service_1.OrdersService, lib_1.OrdersUtil, socket_gateway_1.SocketGateway],
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map