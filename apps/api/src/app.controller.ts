import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PingReqType, PingResType } from "@repo/api"

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('ping')
  ping(@Body() ping: PingReqType): PingResType {
    console.log('ping', ping)
    return { message: ping.message, time: new Date(Date.now()) }
  }
}
