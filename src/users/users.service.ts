/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateAvatarDto, UpdateProfileDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities';
import { Not, Repository } from 'typeorm';
import { AppResponse, UserType } from 'src/lib';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException(
        AppResponse.getResponse('failed', {
          message: 'You are not authorized',
        }),
      );
    }

    // Check email uniqueness only if email is provided
    if (updateProfileDto.email) {
      const existingUserCount = await this.userRepository.count({
        where: {
          id: Not(userId),
          user_type: UserType.USER,
          email: updateProfileDto.email,
        },
      });

      if (existingUserCount > 0) {
        throw new BadRequestException(
          AppResponse.getResponse('failed', {
            message: 'A user with the same email already exists',
          }),
        );
      }
    }

    // Update fields dynamically
    Object.assign(user, updateProfileDto);

    const updatedUser = await this.userRepository.save(user);

    // Exclude password from response
    const { password, ...userWithoutPassword } = updatedUser;

    return AppResponse.getResponse('success', {
      data: { profile: userWithoutPassword },
      message: 'Profile updated successfully',
    });
  }

  async updateAvatar(userId: string, updateAvatarDto: UpdateAvatarDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        AppResponse.getResponse('failed', {
          message: 'You are not authorized',
        }),
      );
    }

    user.avatar = updateAvatarDto.avatar;

    await this.userRepository.save(user);
    return AppResponse.getResponse('success', {
      data: {
        avatar: updateAvatarDto.avatar,
      },
      message: 'Profile Picture updated successfully',
    });
  }
}
