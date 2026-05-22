import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { env } from '@repo/config/env/rabbit';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [env.RABBIT_URL],
        queue: 'orders-queue',
        persistent: true,
        prefetchCount: 1,
        noAck: false,
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  await app.listen();
}
bootstrap().catch(console.error);
