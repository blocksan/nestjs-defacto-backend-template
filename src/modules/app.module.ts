import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController,ContentController } from '../controllers';
import { AppService, ContentService } from '../services';
import { ApplicationLoggerModule } from './logger.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from 'src/utils/filter/http-error.util';
import { LoggingInterceptor } from 'src/utils/filter/logging.interceptor';
import { ReqestMiddleware } from 'src/middlewares';

@Module({
  imports: [ApplicationLoggerModule],
  controllers: [AppController, ContentController],
  providers: [AppService, ContentService,{
    provide: APP_FILTER,
    useClass: HttpErrorFilter
  },{
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor
  }],
})
export class AppModule {
  /**
   * Adding middleware configuration
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ReqestMiddleware)
      .forRoutes('*');
  }
}
