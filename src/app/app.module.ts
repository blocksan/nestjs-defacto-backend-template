import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApplicationLoggerModule } from '../logger/logger.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from 'src/shared/filter/http-error.util';
import { LoggerInterceptor } from 'src/logger/logger.interceptor';
import { ReqestMiddleware } from 'src/shared/middlewares';
import { ConfigModule } from '@nestjs/config';
import { dbconfig } from 'src/shared/config/database.config';
import { ContentController } from 'src/test-content/content.controller';
import { AppService } from './app.service';
import { ContentService } from 'src/test-content/content.service';
import { ContentModule } from 'src/test-content/content.module';
import { AuthModule } from 'src/auth/auth.module';
import { appConfig } from 'src/shared/config/app.config';
import { KnexModule } from '@nestjsplus/knex';
import { KnexDBConnectionService } from 'src/shared/orm/knex-connection.service';
import { TableModule } from 'src/dbservices/tables/table.module';
import { LocationModule } from 'src/dbservices/tables/location/location.module';
import { LocationController } from 'src/features/location/location.controller';
import { LocationService } from 'src/features/location/location.service';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
@Module({
  imports: [
    KnexModule.registerAsync({
        useClass: KnexDBConnectionService,
    }),
    ApplicationLoggerModule,AuthModule, ContentModule, LocationModule,
    TableModule,
    ConfigModule.forRoot({
    isGlobal: true,
    load: [dbconfig,appConfig]
  })],
  controllers: [AppController, ContentController, LocationController],
  providers: [AppService, ContentService, LocationService, {
    provide: APP_FILTER,
    useClass: HttpErrorFilter
  }, {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
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