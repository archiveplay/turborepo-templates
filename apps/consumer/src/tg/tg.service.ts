import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { env } from '@repo/config/env/tg';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TgService {
  private readonly token = env.TG_BOT_TOKEN;
  private readonly baseUrl = `https://api.telegram.org/bot${this.token}`;

  constructor(private readonly http: HttpService) {}

  async sendMessage(chatId: string, text: string) {
    const url = `${this.baseUrl}/sendMessage`;

    const payload = {
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    };

    const res = await firstValueFrom(this.http.post(url, payload));

    return res.data;
  }
}
