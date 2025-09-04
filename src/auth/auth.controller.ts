/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get("status")
  getAuthStatus() {
    return {
      status: "success",
      message: "login retrieved successfully"
    }
  }
  @Post("login")
  login() {
    return {
      status: "success",
      message: "login retrieved successfully"
    }
  }
  @Post("google-login")
  loginWithGoogle() {
    return {
      status: "success",
      message: "login retrieved successfully"
    }
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
