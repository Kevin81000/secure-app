

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // Make sure this path is correct

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: '*' }); // Allow all for testing
    await app.listen(3000);
    console.log('BACKEND IS RUNNING ON http://localhost:3000');
  } catch (error) {
    console.error('FAILED TO START BACKEND:', error);
    process.exit(1);
  }
}
bootstrap();

