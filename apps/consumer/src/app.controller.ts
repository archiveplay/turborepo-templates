import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EventDto } from './event.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('create')
  handleEvent(@Payload() event: EventDto, @Ctx() context: RmqContext) {
    return this.appService.handleEvent(event, context);
  }
}
