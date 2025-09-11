import {
  Controller,
  Get,
  Patch,
  Delete,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/providers';
import { ApiBearerAuth } from '@nestjs/swagger';

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
  updateUserProfile() {}

  @Patch('profile-picture')
  updateProfilePicture() {}

  @Get('favourites/')
  getFavourites() {}

  @Post('favourites/')
  addFavourites() {}

  @Delete('favourites/:id')
  deleteFavourites() {}
}
