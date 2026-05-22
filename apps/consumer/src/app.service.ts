import { Injectable, Logger } from '@nestjs/common';
import { EventType } from '@repo/api/rabbit';

const logger = new Logger('AppService');

@Injectable()
export class AppService {
  handleEvent(event: EventType) {
    logger.log('Event getted', event);
  }
}
