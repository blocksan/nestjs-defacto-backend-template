import { Injectable, Inject, Logger } from '@nestjs/common';
import { ApplicationLoggerService } from '../logger/logger.service';

@Injectable()
export class AppService {

  
  constructor(private appLogger: ApplicationLoggerService){
    this.appLogger.setContext('AppService')
  }

  getHello(): string {
    this.appLogger.log('print hello')
    return 'Hello World!';
  }
}
