import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
// import * as cookieParser from 'cookie-parser';
import fastifyCookie from '@fastify/cookie';
import multipart from '@fastify/multipart';

async function bootstrap() {
  const port = process.env.PORT || 3001;

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    // new FastifyAdapter(),
  );
  const options = {
    origin: [
      'https://temppdpa.buildersmart.com',
      'http://localhost',
      'http://localhost:3000',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    //preflightContinue: false,
    credentials: true,
    //allowedHeaders: 'Content-Type, Accept',
  };
  // app.register(helmet, {
  //   contentSecurityPolicy: {
  //     directives: {
  //       defaultSrc: [`'self'`],
  //       styleSrc: [`'self'`, `'unsafe-inline'`],
  //       imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
  //       scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
  //     },
  //   },
  // });
  // app.useStaticAssets({ root: join(__dirname, '../../fastify-file-upload') });
  await app.register(multipart);
  app.enableCors(options);
  app.useGlobalPipes(new ValidationPipe());
  await app.register(fastifyCookie);
  await app.listen(port);
}
bootstrap();
