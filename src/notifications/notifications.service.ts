import { InjectRepository } from '@nestjs/typeorm';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { NotificationEntity } from 'src/entities/entity.notification';
import { Repository } from 'typeorm';
import { AppResponse } from 'src/lib';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>,
  ) {}

  async findAll(userId: string) {
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

    return AppResponse.getResponse('success', {
      data: {
        notifications,
      },
      message: 'Notifications retrieved successfully',
    });
  }

  async remove(id: string, userId: string) {
    const notification = await this.notificationRepository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });

    if (!notification)
      throw new BadGatewayException(
        AppResponse.getFailedResponse('Notification does not exists'),
      );
    await this.notificationRepository.delete({ id });
    return AppResponse.getSuccessResponse({
      message: 'Notification Deleted successfully',
    });
  }
}
