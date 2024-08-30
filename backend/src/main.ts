import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as session from 'express-session';

import { AppModule } from './app.module';
import { EnvService } from './env/env.service';

async function bootstrap() {
  // const app = await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   new FastifyAdapter(),
  // );
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000',
    },
  });
  const port = app.get(EnvService).get('PORT');

  await app.listen(port);
}
bootstrap();
