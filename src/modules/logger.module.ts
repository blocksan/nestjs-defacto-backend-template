import { Module } from '@nestjs/common';
import {ApplicationLogger} from './../services/';

@Module({
  providers: [ApplicationLogger],
  exports: [ApplicationLogger],
})
export class ApplicationLoggerModule {}