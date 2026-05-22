import { Injectable, Logger } from '@nestjs/common';
import { EventType } from '@repo/api/rabbit';
import { markEventProcessed } from './common/utils/prisma';
import { RmqContext } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  async handleEvent(event: EventType, context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      const isFirstTime = await markEventProcessed(event.id);

      this.logger.log(
        'Event getted',
        event,
        isFirstTime ? 'first time' : 'already in proccess',
      );

      if (!isFirstTime) {
        channel.ack(message);
        return;
      }
    } catch {
      channel.nack(message, false, true);
    }
  }
}
