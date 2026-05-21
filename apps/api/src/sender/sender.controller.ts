import { Body, Controller, Post } from '@nestjs/common';
import { SenderService } from './sender.service';
import { EventDto } from './event.dto';

@Controller('sender')
export class SenderController {
  constructor(private readonly senderService: SenderService) {}

  @Post('send-event')
  sendEvent(@Body() event: EventDto) {
    console.log('ctlr', event);
    this.senderService.sendEvent(event);
  }
}
