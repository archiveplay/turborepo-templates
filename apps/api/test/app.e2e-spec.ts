import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PingResType } from '@repo/api/ping';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/ping (POST)', () => {
    return request(app.getHttpServer())
      .post('/ping')
      .send({ message: 'hello' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            message: 'hello',
          }),
        );

        expect(
          new Date((res.body as PingResType).time).getTime(),
        ).toBeLessThanOrEqual(Date.now());
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
