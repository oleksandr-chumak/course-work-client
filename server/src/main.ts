import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestFastifyApplication} from "@nestjs/platform-fastify";

async function bootstrap() {
  const app:NestFastifyApplication = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
