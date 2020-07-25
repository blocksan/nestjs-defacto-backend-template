import { Module } from '@nestjs/common';
import { AppController,ContentController } from '../controllers';
import { AppService, ContentService } from '../services';
import { ApplicationLoggerModule } from './logger.module';

@Module({
  imports: [ApplicationLoggerModule],
  controllers: [AppController, ContentController],
  providers: [AppService, ContentService],
})
export class AppModule {}
