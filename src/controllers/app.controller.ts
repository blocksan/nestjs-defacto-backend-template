import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from '../services/app.service';
// import { ApplicationLogger } from 'src/services';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Inject()
  // private logger = ApplicationLogger

  @Get()
  getHello(): string {
    // this.logger.warn('in controller')
    return this.appService.getHello();
  }
}
