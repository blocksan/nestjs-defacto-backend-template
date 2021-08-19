import { Controller, Get, Inject, Req, UseGuards, Request, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { ApplicationLoggerService } from 'src/logger/logger.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { GoogleAuthGuard } from 'src/auth/google/google-auth.guard';
import { SuccessResponseDto } from 'src/interceptors/response.interceptor';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService, private appLogger: ApplicationLoggerService) {
    this.appLogger.setContext('AppController')
  }

  @Inject()
  private configService: ConfigService

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@Request() req): SuccessResponseDto {
    this.appLogger.log(`AppController in controller ${this.configService.get("DB_TYPE")} ${JSON.stringify(req.user)}`)
    return this.appService.getHello()
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }

  

  // @Get('facebook')
  // @UseGuards(GoogleAuthGuard)
  // async googleAuth(@Req() req) {
  // }

  // @Get('facebook/redirect')
  // @UseGuards(GoogleAuthGuard)
  // googleAuthRedirect(@Req() req) {
  //   if (!req.user) {
  //     return 'No user from google'
  //   }

  //   return {
  //     message: 'User information from google',
  //     user: req.user
  //   }
  // }

}
