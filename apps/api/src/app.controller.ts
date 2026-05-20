import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PingReqSchema, PingResSchema } from '@repo/api';
import { createZodDto, ZodResponse } from 'nestjs-zod';

class PingReqDto extends createZodDto(PingReqSchema) {}
class PingResDto extends createZodDto(PingResSchema) {}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('ping')
  @ZodResponse({ type: PingResDto })
  ping(@Body() ping: PingReqDto) {
    return { message: ping.message, time: new Date(Date.now()).toDateString() }
  }
}
