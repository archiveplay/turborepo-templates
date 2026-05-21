import { Injectable } from '@nestjs/common';
import { EventType } from '@repo/api/rabbit';

@Injectable()
export class AppService {
  handleEvent(event: EventType) {
    console.log('event', event);
  }
}
