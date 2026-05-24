import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { ZodResponse } from 'nestjs-zod';
import { UserResDto, UsersResDto } from 'src/common/dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users/:id')
  @ZodResponse({ type: UserResDto })
  userById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Get('users')
  @ZodResponse({ type: UsersResDto })
  users() {
    return this.userService.getUsers();
  }
}
