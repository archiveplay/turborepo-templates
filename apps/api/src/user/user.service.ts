import { Injectable, NotFoundException } from '@nestjs/common';
import { UserResType, UsersResType } from '@repo/api/user';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(id: number): Promise<UserResType> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
  getUsers(): Promise<UsersResType> {
    return this.prisma.user.findMany();
  }
}
