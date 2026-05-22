import { Injectable } from '@nestjs/common';
import { UsersResType } from '@repo/api/user';
import { prisma } from '@repo/db';

@Injectable()
export class AppService {
  getUsers(): Promise<UsersResType> {
    return prisma.user.findMany();
  }
}
