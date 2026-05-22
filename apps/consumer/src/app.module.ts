import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionsFilter } from '@repo/nest-extensions/filters/all-exceptions';
import { APP_FILTER } from '@nestjs/core';
import { TgService } from './tg/tg.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    TgService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
