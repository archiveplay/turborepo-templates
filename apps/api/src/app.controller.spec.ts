import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('users', () => {
    it('should return an array of users', async () => {
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
});
