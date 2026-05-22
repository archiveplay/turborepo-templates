import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PingReqSchema, PingResSchema } from '@repo/api/ping';
import { createZodDto, ZodResponse } from 'nestjs-zod';
import { UsersResSchema } from '@repo/api/user';

class PingReqDto extends createZodDto(PingReqSchema) {}
class PingResDto extends createZodDto(PingResSchema) {}

class UsersResDto extends createZodDto(UsersResSchema) {}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  @ZodResponse({ type: UsersResDto })
  users() {
    return this.appService.getUsers();
  }

  @Post('ping')
  @ZodResponse({ type: PingResDto })
  ping(@Body() ping: PingReqDto) {
    return { message: ping.message, time: new Date(Date.now()).toDateString() };
  }
}
