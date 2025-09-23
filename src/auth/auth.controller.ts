/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, LoginWithGoogleDto, RegisterUserDto } from './dto';
import { JwtAuthGuard, LocalAuthGuard } from 'src/providers';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import type { AuthRequest } from 'src/lib';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get("status")
  getAuthStatus(@Request() req:any) {
    return this.authService.loginUser(req.user)
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({type:LoginUserDto})
  @Post("login")
  login(@Request() req:AuthRequest) {
    return this.authService.loginUser(req.user)
  }
  @Post("google-login")
  loginWithGoogle(@Body() {access_token}:LoginWithGoogleDto) {
    return this.authService.loginWithGoogle(access_token)
  }
  @Post("register")
  register(@Body() body:RegisterUserDto) {
    return this.authService.registerUser(body)
  }
  @Post("logout")
  logout() {
    return {
      status: "success",
      message: "login retrieved successfully"
    }
  }

  @Post("forgot-password")
  forgotPassword() {
    return {
      status: "success",
      message: "login retrieved successfully"
    }
  }
  @Post("reset-password/:token")
  resetPassword() {
    return {
      status: "success",
      message: "login retrieved successfully"
    }
  }
}
