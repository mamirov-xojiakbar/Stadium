import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  try {
    const config = new DocumentBuilder()
      .setTitle('stadium')
      .setDescription('mini project for stadium finder')
      .setVersion('1.0.0')
      .addTag(
        'NOdeJs. NestJs, Postgres, Sequelize, JWT, Swagger, Bot, SMS, Mailer',
      )
      .build();
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule);

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(3000);
    console.log(`server startted at: ${PORT}`);
  } catch (error) {
    console.log(error);
  }
}
start();
