import { Test } from '@nestjs/testing';
import { SenderController } from './sender.controller';
import { SenderService } from './sender.service';
import { EventType } from '@repo/api/rabbit';

jest.mock('uuid', () => ({
  v4: () => 'test-uuid',
}));

describe('SenderController', () => {
  let controller: SenderController;

  const mockSenderService = {
    sendEvent: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [SenderController],
      providers: [
        {
          provide: SenderService,
          useValue: mockSenderService,
        },
      ],
    }).compile();

    controller = moduleRef.get(SenderController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delegate payload to SenderService', async () => {
    const event = {
      id: 'test-uuid',
      type: 'create',
      createdAt: '2024-01-01T00:00:00.000Z',
      data: { key: 'value' },
    };

    mockSenderService.sendEvent.mockResolvedValue(undefined);

    await controller.sendEvent(event as EventType);

    expect(mockSenderService.sendEvent).toHaveBeenCalledTimes(1);
    expect(mockSenderService.sendEvent).toHaveBeenCalledWith(event);
  });

  it('should not mutate input payload', async () => {
    const event = Object.freeze({
      id: 'test-uuid',
      type: 'create',
      createdAt: '2024-01-01T00:00:00.000Z',
      data: { key: 'value' },
    });

    mockSenderService.sendEvent.mockResolvedValue(undefined);

    await controller.sendEvent(event as EventType);

    const calledArg = mockSenderService.sendEvent.mock.calls[0][0];

    expect(calledArg).toEqual(event);
  });

  it('should propagate errors from SenderService', async () => {
    mockSenderService.sendEvent.mockRejectedValue(new Error('Service failure'));

    await expect(
      controller.sendEvent({
        id: '1',
        type: 'create',
        createdAt: '2024-01-01T00:00:00.000Z',
        data: {},
      } as EventType),
    ).rejects.toThrow('Service failure');
  });

  it('should call service exactly once per request', async () => {
    mockSenderService.sendEvent.mockResolvedValue(undefined);

    const event = {
      id: '2',
      type: 'update',
      createdAt: '2024-01-01T00:00:00.000Z',
      data: { a: 1 },
    };

    await controller.sendEvent(event as EventType);
    await controller.sendEvent(event as EventType);

    expect(mockSenderService.sendEvent).toHaveBeenCalledTimes(2);
  });
});
