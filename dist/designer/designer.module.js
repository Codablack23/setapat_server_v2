"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignerModule = void 0;
const entity_order_1 = require("./../entities/entity.order");
const common_1 = require("@nestjs/common");
const designer_service_1 = require("./designer.service");
const designer_controller_1 = require("./designer.controller");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const entity_conversations_1 = require("../entities/entity.conversations");
const entity_designer_1 = require("../entities/entity.designer");
const entity_discount_1 = require("../entities/entity.discount");
const entity_edit_page_1 = require("../entities/entity.edit_page");
const entity_message_revisions_1 = require("../entities/entity.message_revisions");
const entity_messages_1 = require("../entities/entity.messages");
const entity_notification_1 = require("../entities/entity.notification");
const entity_order_assignments_1 = require("../entities/entity.order_assignments");
const entity_order_edits_1 = require("../entities/entity.order_edits");
const entity_order_receipts_1 = require("../entities/entity.order_receipts");
const entity_order_reviews_1 = require("../entities/entity.order_reviews");
const entity_participants_1 = require("../entities/entity.participants");
const entity_revisions_1 = require("../entities/entity.revisions");
const entity_used_discount_1 = require("../entities/entity.used_discount");
let DesignerModule = class DesignerModule {
};
exports.DesignerModule = DesignerModule;
exports.DesignerModule = DesignerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entity_order_1.OrderEntity,
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
                entity_used_discount_1.UsedDiscountEntity,
                entity_discount_1.DiscountEntity,
            ]),
        ],
        controllers: [designer_controller_1.DesignerController],
        providers: [designer_service_1.DesignerService],
    })
], DesignerModule);
//# sourceMappingURL=designer.module.js.map