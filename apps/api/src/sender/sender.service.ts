import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EventType } from '@repo/api/rabbit';
import { catchError, firstValueFrom, retry, throwError, timeout } from 'rxjs';

@Injectable()
export class SenderService {
  private readonly logger = new Logger(SenderService.name);

  constructor(@Inject('SENDER_SERVICE') private rabbit: ClientProxy) {}

  async sendEvent(event: EventType) {
    await firstValueFrom(
      this.rabbit.emit(event.type, event).pipe(
        timeout(5000),
        retry({ count: 3 }),

        catchError((err) => {
          this.logger.error(`Failed to publish event ${event.id}`, err);
          return throwError(() => err);
        }),
      ),
    );

    this.logger.log(`Event published ${event.id}`);
  }
}
