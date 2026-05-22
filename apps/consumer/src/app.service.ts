import { Injectable, Logger } from '@nestjs/common';
import { EventType } from '@repo/api/rabbit';
import { markEventProcessed } from './common/utils/prisma';
import { RmqContext } from '@nestjs/microservices';
import { TgService } from './tg/tg.service';
import { env } from '@repo/config/env/tg';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly tgService: TgService) {}

  async handleEvent(event: EventType, context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      const { inserted } = await markEventProcessed(event.id);
      this.logger.log('Event received', {
        eventId: event.id,
        state: inserted ? 'first-time' : 'duplicate',
      });

      await this.tgService.sendMessage(
        env.TG_CHAT_ID,
        JSON.stringify(event.data),
      );

      channel.ack(message);
    } catch (err) {
      this.logger.error('Event processing failed', err);
      channel.nack(message, false, false);
    }
  }
}
