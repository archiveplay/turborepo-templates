import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PingReqSchema, PingResSchema } from '@repo/api/ping';
import { createZodDto, ZodResponse } from 'nestjs-zod';
import { prisma } from '@repo/db';
import { Logger } from '@repo/logger';

const logger = new Logger('app.controller.ts', 'API');

class PingReqDto extends createZodDto(PingReqSchema) {}
class PingResDto extends createZodDto(PingResSchema) {}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  users() {
    return prisma.user.findMany();
  }

  @Post('ping')
  @ZodResponse({ type: PingResDto })
  ping(@Body() ping: PingReqDto) {
    logger.log(
      `Ping from client ${ping.message ? `with message ${ping.message}` : ''}`,
    );
    return { message: ping.message, time: new Date(Date.now()).toDateString() };
  }
}
