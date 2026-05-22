import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EventType } from '@repo/api/rabbit';

@Injectable()
export class SenderService {
  constructor(@Inject('SENDER_SERVICE') private rabbit: ClientProxy) {}

  sendEvent(event: EventType) {
    this.rabbit.emit(event.type, event.data);
  }
}
