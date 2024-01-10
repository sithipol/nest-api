import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import multipart from '@fastify/multipart';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true }),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.register(fastifyCookie);
  app.register(multipart);
  // app.enableCors(options);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port, '0.0.0.0');
}
bootstrap();
