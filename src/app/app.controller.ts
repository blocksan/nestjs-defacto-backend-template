import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { ApplicationLoggerService } from 'src/logger/logger.service';
// import { ConfigService } from '@nestjs/config';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService, private appLogger: ApplicationLoggerService) {
   this.appLogger.setContext('AppController')
  }

  @Inject()
  private configService: ConfigService

  @Get()
  getHello(): string {
    this.appLogger.log(`AppController in controller ${this.configService.get("DB_TYPE")}`)
    return this.appService.getHello();
  }
}
