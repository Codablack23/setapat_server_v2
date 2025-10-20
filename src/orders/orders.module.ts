import { OrderReviewEntity } from 'src/entities/entity.order_reviews';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  OrderBriefAttachmentEntity,
  OrderEntity,
  OrderPageEntity,
  OrderResizeExtraEntity,
  OrderSubmissionEntity,
} from 'src/entities';
import { OrdersUtil } from 'src/lib';
import { NotificationEntity } from 'src/entities/entity.notification';
import { DesignerProfileEntity } from 'src/entities/entity.designer';
import { OrderAssignmentEntity } from 'src/entities/entity.order_assignments';
import { OrderReceiptEntity } from 'src/entities/entity.order_receipts';
import { OrderEditEntity } from 'src/entities/entity.order_edits';
import { OrderEditPageEntity } from 'src/entities/entity.edit_page';
import { ConversationEntity } from 'src/entities/entity.conversations';
import { ConversationParticipantEntity } from 'src/entities/entity.participants';
import { MessageEntity } from 'src/entities/entity.messages';
import { MessageRevisionEntity } from 'src/entities/entity.message_revisions';
import { SubmissionRevisions } from 'src/entities/entity.revisions';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderPageEntity,
      OrderSubmissionEntity,
      OrderResizeExtraEntity,
      NotificationEntity,
      DesignerProfileEntity,
      OrderAssignmentEntity,
      OrderBriefAttachmentEntity,
      OrderReviewEntity,
      OrderReceiptEntity,
      OrderEditEntity,
      OrderEditPageEntity,
      ConversationEntity,
      ConversationParticipantEntity,
      MessageEntity,
      SubmissionRevisions,
      MessageRevisionEntity,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersUtil],
})
export class OrdersModule {}
