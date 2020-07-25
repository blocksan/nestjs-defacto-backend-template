import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApplicationLogger } from './services';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{logger:false});
  app.setGlobalPrefix('/api')
  app.useLogger(new ApplicationLogger())

  const options = new DocumentBuilder()
    .setTitle('Backend Service')
    .setDescription('The backend service API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3001,() => {
    Logger.log(`Service started at 3001 port`)
  });
}
bootstrap();
