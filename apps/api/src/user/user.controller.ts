import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ZodResponse } from 'nestjs-zod';
import { UserResDto, UsersResDto } from 'src/common/dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users/:id')
  @UseInterceptors(CacheInterceptor)
  @ZodResponse({ type: UserResDto })
  @ApiOkResponse({ type: UserResDto })
  userById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Get('users')
  @ZodResponse({ type: UsersResDto })
  @ApiOkResponse({ type: UsersResDto })
  users() {
    return this.userService.getUsers();
  }
}
