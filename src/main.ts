import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';

const DEFAULT_PORT = 9999;

async function bootstrap() {
  const logger = new Logger('main');

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  app.enableShutdownHooks();

  const port = process.env.SERVER_PORT || DEFAULT_PORT;

  await app.listen(port);

  logger.log(`App started listening on Port: ${port}...`);
}

bootstrap();
