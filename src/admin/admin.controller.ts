import { Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/providers';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  getAllUsers() {}

  @Get('admins')
  getAllAdmins() {}

  @Get('orders')
  getOrders() {}

  @Post('admins')
  addAdmin() {}

  @Patch('profile')
  updateProfile() {}

  @Get('statistics')
  getAdminStatistics() {}

  @Patch('users/:id')
  getUserDetila() {}

  @Post('profile/setup')
  setupProfile() {}

  @Get('applications')
  getApplications() {}

  @Get('applications/:id')
  getApplication() {}

  @Post('users/:id/suspend')
  suspendUsers() {}

  @Post('users/:id/activate')
  activateUsers() {}

  @Post('admins/:id/suspend')
  suspendAdmin() {}

  @Post('admins/:id/activate')
  activateAdmin() {}

  @Post('applications/:id/accept')
  acceptApplication() {}

  @Post('applications/:id/reject')
  rejectApplication() {}
}
