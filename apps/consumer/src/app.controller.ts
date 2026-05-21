import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventDto } from './event.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('create')
  handleEvent(@Payload() event: EventDto) {
    return this.appService.handleEvent(event);
  }
}
