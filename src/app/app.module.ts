import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ApplicationLoggerModule } from '../logger/logger.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from 'src/shared/filter/http-error.util';
import { LoggerInterceptor } from 'src/logger/logger.interceptor';
import { ReqestMiddleware } from 'src/shared/middlewares';
import { ConfigModule } from '@nestjs/config';
import { dbconfig } from 'src/shared/config/database.config';
import { DatabaseConnectionService } from 'src/shared/orm/database-connection.service';
import { ContentController } from 'src/test-content/content.controller';
import { AppService } from './app.service';
import { ContentService } from 'src/test-content/content.service';
import { ContentModule } from 'src/test-content/content.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ApplicationLoggerModule,AuthModule, ContentModule, ConfigModule.forRoot({
    isGlobal: true,
    load: [dbconfig]
  }), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useClass: DatabaseConnectionService
  })],
  controllers: [AppController, ContentController],
  providers: [AppService, ContentService, {
    provide: APP_FILTER,
    useClass: HttpErrorFilter
  }, {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor
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