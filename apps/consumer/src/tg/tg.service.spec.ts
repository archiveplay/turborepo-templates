import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { TgService } from './tg.service';
import { of, throwError } from 'rxjs';

describe('TgService', () => {
  let service: TgService;

  const mockHttpService = {
    post: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TgService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<TgService>(TgService);

    jest.clearAllMocks();
  });

  it('should send message with correct payload and return response data', async () => {
    const chatId = '12345';
    const text = 'Hello world';

    const mockResponse = {
      data: { ok: true, result: { message_id: 1 } },
    };

    mockHttpService.post.mockReturnValue(of(mockResponse));

    const result = await service.sendMessage(chatId, text);

    expect(mockHttpService.post).toHaveBeenCalledTimes(1);

    const [url, payload] = mockHttpService.post.mock.calls[0];

    expect(url).toContain('/sendMessage');
    expect(payload).toEqual({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    });

    expect(result).toEqual(mockResponse.data);
  });

  it('should propagate error when http request fails', async () => {
    const error = new Error('Telegram API error');

    mockHttpService.post.mockReturnValue(throwError(() => error));

    await expect(service.sendMessage('123', 'test')).rejects.toThrow(
      'Telegram API error',
    );
  });
});
