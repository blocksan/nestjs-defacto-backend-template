import { Injectable, Inject, Logger } from '@nestjs/common';
import { ApplicationLogger } from './logger.service';

@Injectable()
export class AppService {

  
  constructor(private appLogger: ApplicationLogger){
    this.appLogger.setContext('AppService')
  }

  getHello(): string {
    this.appLogger.log('print hello')
    return 'Hello World!';
  }
}
