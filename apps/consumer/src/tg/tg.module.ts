import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TgService } from './tg.service';

@Module({
  imports: [HttpModule],
  providers: [TgService],
  exports: [TgService],
})
export class TgModule {}
