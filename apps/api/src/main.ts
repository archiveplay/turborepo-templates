import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from '@repo/config/env/server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.PORT ?? 4000);
}
bootstrap().catch((err) => {
  console.error('Application failed to start:', err);
  process.exit(1);
});
