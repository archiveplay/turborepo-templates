import { Module } from '@nestjs/common';
import { SenderService } from './sender.service';
import { SenderController } from './sender.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { env } from '@repo/config/env/rabbit';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SENDER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [env.RABBIT_URL],
          queue: 'orders-queue',
        },
      },
    ]),
  ],
  controllers: [SenderController],
  providers: [SenderService],
})
export class SenderModule {}
