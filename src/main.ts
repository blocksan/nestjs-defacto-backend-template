import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api')

  const options = new DocumentBuilder()
    .setTitle('Backend Service')
    .setDescription('The backend service API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  /**
   * import port from the configuration
   */

  const configService = app.get(ConfigService)
  const port = configService.get('APP_PORT')
  SwaggerModule.setup('swagger', app, document);
  await app.listen(port,() => {
    Logger.log(`Service started at ${port} port`)
  });
}
bootstrap();
