import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserResDto, UsersResDto } from './common/dto/';
import { AppService } from './app.service';
import { ZodResponse } from 'nestjs-zod';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users/:id')
  @ZodResponse({ type: UserResDto })
  userById(@Param('id', ParseIntPipe) id: number) {
    return this.appService.getUserById(id);
  }

  @Get('users')
  @ZodResponse({ type: UsersResDto })
  users() {
    return this.appService.getUsers();
  }
}
