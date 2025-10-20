import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entities/entity.messages';
import { Repository } from 'typeorm';
import { ConversationEntity } from 'src/entities/entity.conversations';
import { MessageAttachmentEntity } from 'src/entities/entity.message_attachment';
import {
  AppResponse,
  ConversationStatus,
  MessageType,
  ParticipantStatus,
  RevisionPerPage,
  SubmissionPageType,
} from 'src/lib';
import { SendMessageDto } from './dto/create-conversation.dto';
import { UserEntity } from 'src/entities';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepo: Repository<MessageEntity>,
    @InjectRepository(ConversationEntity)
    private conversationRepo: Repository<ConversationEntity>,
    @InjectRepository(MessageAttachmentEntity)
    private messageAttachmentRepo: Repository<MessageAttachmentEntity>,
  ) {}

  async getMessages(userId: string, id: string) {
    // Step 1: Verify user is in this conversation
    const conversation = await this.conversationRepo.findOne({
      where: { id, participants: { user: { id: userId } } },
    });

    if (!conversation) {
      throw new ForbiddenException(
        AppResponse.getFailedResponse(
          'You are not allowed to view these messages',
        ),
      );
    }

    // Step 2: Fetch messages
    const messagesRes = await this.messageRepo.find({
      where: { conversation: { id } },
      relations: {
        sender: true,
        attachments: true,
        order_submissions: true,
        revisions: true,
      },
      order: { created_at: 'ASC' },
      take: 100, // 🔹 default pagination
    });

    const messages = messagesRes.map((message) => {
      if (message.type != MessageType.SUBMISSION) return message;

      let revisionsPerPage: RevisionPerPage = {};

      message.revisions?.forEach((item) => {
        const pageKey = item.page.toString();
        const existing = revisionsPerPage[pageKey] || { count: 0, resize: {} };

        if (item.page_type === SubmissionPageType.PAGE) {
          revisionsPerPage = {
            ...revisionsPerPage,
            [pageKey]: {
              ...existing,
              count: item.revisions ?? 0,
            },
          };
        } else if (
          item.page_type === SubmissionPageType.RESIZE &&
          item.resize_page
        ) {
          const resizeKey = item.resize_page.toString();

          revisionsPerPage = {
            ...revisionsPerPage,
            [pageKey]: {
              ...existing,
              resize: {
                ...existing.resize,
                [resizeKey]: { count: item.revisions },
              },
            },
          };
        }
      });

      return {
        ...message,
        revisions: revisionsPerPage,
      };
    });

    return AppResponse.getSuccessResponse({
      message: 'Messages retrieved successfully',
      data: { messages },
    });
  }

  async sendMessage(
    user: UserEntity,
    id: string,
    sendMessageDto: SendMessageDto,
  ) {
    const conversation = await this.conversationRepo.findOne({
      where: {
        id,
        participants: {
          status: ParticipantStatus.ACTIVE,
          user: { id: user.id },
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation could not be found');
    }

    if (conversation.status === ConversationStatus.CLOSED) {
      throw new ForbiddenException(
        "Sorry you can't send message to a closed conversation",
      );
    }

    // 1. Create the message first
    const newMessage = this.messageRepo.create({
      content: sendMessageDto.content,
      sender: user,
      conversation,
    });

    // 2. Save the message
    const message = await this.messageRepo.save(newMessage);

    // 3. If there are attachments, link them to the saved message
    if (sendMessageDto.attachments?.length) {
      const attachments = sendMessageDto.attachments.map((item) =>
        this.messageAttachmentRepo.create({
          ...item,
          message, // link attachment to message
        }),
      );

      await this.messageAttachmentRepo.save(attachments);
      message.type = MessageType.ATTACHMENT;

      // reload message with attachments
      message.attachments = attachments;

      await this.messageRepo.save(message);
    }

    return AppResponse.getSuccessResponse({
      message: 'message sent successfully',
      data: { message },
    });
  }
}
