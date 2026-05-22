import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersResType, UserResType } from '@repo/api/user';
import { prisma } from '@repo/db';

@Injectable()
export class AppService {
  async getUserById(id: number): Promise<UserResType> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
  getUsers(): Promise<UsersResType> {
    return prisma.user.findMany();
  }
}
