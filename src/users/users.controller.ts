import {
  Controller,
  Get,
  Patch,
  Delete,
  Post,
  UseGuards,
  Body,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/providers';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateAvatarDto, UpdateProfileDto } from './dto';
import type { AuthRequest } from 'src/lib';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getUserProfile() {}

  @Delete('deactivate')
  deleteUserAccount() {}

  @Patch('profile')
  updateUserProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @Request() req: AuthRequest,
  ) {
    return this.usersService.updateProfile(req.user.id, updateProfileDto);
  }

  @Patch('avatar')
  updateProfilePicture(
    @Body() updateAvatarDto: UpdateAvatarDto,
    @Request() req: AuthRequest,
  ) {
    return this.usersService.updateAvatar(req.user.id, updateAvatarDto);
  }

  @Get('favourites/')
  getFavourites() {}

  @Post('favourites/')
  addFavourites() {}

  @Delete('favourites/:id')
  deleteFavourites() {}
}
