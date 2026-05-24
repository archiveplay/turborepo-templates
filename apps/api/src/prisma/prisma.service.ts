import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { adapter, PrismaClient } from '@repo/db';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor() {
    super({ adapter });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
