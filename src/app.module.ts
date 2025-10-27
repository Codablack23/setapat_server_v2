import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './config';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { ConversationsModule } from './conversations/conversations.module';
import { SamplesModule } from './samples/samples.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AssetsModule } from './assets/assets.module';
import { DiscountsModule } from './discounts/discounts.module';
import { SeedersModule } from './seeders/seeders.module';
import { ApplicationsModule } from './applications/applications.module';
import { FeedbackModule } from './feedback/feedback.module';
import { FaqsModule } from './faqs/faqs.module';
import { DesignerModule } from './designer/designer.module';
import { SupervisorModule } from './supervisor/supervisor.module';
import { CommonModule } from './common/common.module';
import { ReceiptModule } from './receipt/receipt.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          ...AppDataSource.options,
          autoLoadEntities: true,
        };
      },
    }),
    AuthModule,
    OrdersModule,
    UsersModule,
    AdminModule,
    ConversationsModule,
    SamplesModule,
    NotificationsModule,
    AssetsModule,
    DiscountsModule,
    SeedersModule,
    ApplicationsModule,
    FeedbackModule,
    FaqsModule,
    DesignerModule,
    SupervisorModule,
    CommonModule,
    ReceiptModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
