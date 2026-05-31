import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { AllExceptionsFilter } from '@repo/nest-extensions/filters/all-exceptions';
import { APP_FILTER } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import { KeyvCacheableMemory } from 'cacheable';
import { env } from '@repo/config/env/server';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const memory = new KeyvCacheableMemory({
          ttl: 10000,
          lruSize: 5000,
        });

        const redis = new KeyvRedis(env.REDIS_URL);

        return {
          stores: [memory, redis],
          ttl: env.CACHE_TTL,
        };
      },
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
