import { NestFactory } from '@nestjs/core';

class AppModule { }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  await app.listen(3000);
  console.log('BACKEND RUNNING ON http://localhost:3000 - MINIMAL TEST');
}
bootstrap();
