import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationEntity } from 'src/entities/entity.conversations';
import { ConversationParticipantEntity } from 'src/entities/entity.participants';
import { MessageEntity } from 'src/entities/entity.messages';
import { MessageAttachmentEntity } from 'src/entities/entity.message_attachment';
import { SocketModule } from 'src/socket/socket.module';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConversationEntity,
      ConversationParticipantEntity,
      MessageEntity,
      MessageAttachmentEntity,
      ConversationParticipantEntity,
    ]),
    SocketModule,
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService, SocketGateway],
})
export class ConversationsModule {}
