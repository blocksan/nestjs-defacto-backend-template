import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { ApplicationLoggerService } from 'src/logger/logger.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService, private appLogger: ApplicationLoggerService) {
   this.appLogger.setContext('AppController')
  }

  @Inject()
  private configService: ConfigService

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    this.appLogger.log(`AppController in controller ${this.configService.get("DB_TYPE")}`)
    return this.appService.getHello();
  }

}
