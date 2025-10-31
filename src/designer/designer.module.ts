import { OrderEntity } from './../entities/entity.order';
import { Module } from '@nestjs/common';
import { DesignerService } from './designer.service';
import { DesignerController } from './designer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  OrderPageEntity,
  OrderSubmissionEntity,
  OrderResizeExtraEntity,
  OrderBriefAttachmentEntity,
} from 'src/entities';
import { ConversationEntity } from 'src/entities/entity.conversations';
import { DesignerProfileEntity } from 'src/entities/entity.designer';
import { DiscountEntity } from 'src/entities/entity.discount';
import { OrderEditPageEntity } from 'src/entities/entity.edit_page';
import { MessageRevisionEntity } from 'src/entities/entity.message_revisions';
import { MessageEntity } from 'src/entities/entity.messages';
import { NotificationEntity } from 'src/entities/entity.notification';
import { OrderAssignmentEntity } from 'src/entities/entity.order_assignments';
import { OrderEditEntity } from 'src/entities/entity.order_edits';
import { OrderReceiptEntity } from 'src/entities/entity.order_receipts';
import { OrderReviewEntity } from 'src/entities/entity.order_reviews';
import { ConversationParticipantEntity } from 'src/entities/entity.participants';
import { SubmissionRevisions } from 'src/entities/entity.revisions';
import { UsedDiscountEntity } from 'src/entities/entity.used_discount';

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
      UsedDiscountEntity,
      DiscountEntity,
    ]),
  ],
  controllers: [DesignerController],
  providers: [DesignerService],
})
export class DesignerModule {}
