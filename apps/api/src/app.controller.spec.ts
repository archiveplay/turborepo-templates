import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  const mockAppService = {
    getUserById: jest.fn(),
    getUsers: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('users', () => {
    it('should return an array of users', async () => {
      const mockUsers = [
        {
          id: 1,
          name: 'John',
          email: 'john@test.com',
        },
      ];

      mockAppService.getUsers.mockResolvedValue(mockUsers);

      const result = await appController.users();

      expect(Array.isArray(result)).toBe(true);

      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            email: expect.any(String),
            name: expect.any(String),
          }),
        ]),
      );
    });
  });

  describe('userById', () => {
    it('should return user by id', async () => {
      const mockUser = {
        id: 1,
        name: 'John',
        email: 'john@test.com',
      };

      mockAppService.getUserById.mockResolvedValue(mockUser);

      const result = await appController.userById(1);

      expect(result).toEqual(mockUser);

      expect(mockAppService.getUserById).toHaveBeenCalledTimes(1);
      expect(mockAppService.getUserById).toHaveBeenCalledWith(1);
    });

    it('should throw if service throws', async () => {
      mockAppService.getUserById.mockRejectedValue(new Error('User not found'));

      await expect(appController.userById(1)).rejects.toThrow('User not found');

      expect(mockAppService.getUserById).toHaveBeenCalledWith(1);
    });
  });
});
