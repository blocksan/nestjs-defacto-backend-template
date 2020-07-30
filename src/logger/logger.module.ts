import { Module } from '@nestjs/common';
import {ApplicationLoggerService} from './logger.service';

@Module({
  providers: [ApplicationLoggerService],
  exports: [ApplicationLoggerService],
})
export class ApplicationLoggerModule {}