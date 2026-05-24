import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { UserResType } from '@repo/api/user';
import { PrismaService } from './../src/prisma/prisma.service';

const testUser = { name: 'testik', email: 'test@example.com' };

describe('UserController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
      .expect((res) => {
        expect(res.body as UserResType).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            email: expect.any(String),
            name: expect.any(String),
          }),
        );
      });
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(res.body as UserResType[]).toEqual(
          expect.arrayOf(
            expect.objectContaining({
              id: expect.any(Number),
              email: expect.any(String),
              name: expect.any(String),
            }),
          ),
        );
      });
  });

  afterEach(async () => {
    await app.close();
  });
});

describe('Prisma', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    prisma = moduleRef.get(PrismaService);
  });

  afterAll(async () => {
    await prisma.user.delete({
      where: testUser,
    });
    await prisma.$disconnect();
    await app.close();
  });

  it('should create and fetch user', async () => {
    const created = await prisma.user.create({
      data: testUser,
    });

    const found = await prisma.user.findUnique({
      where: { id: created.id },
    });

    expect(found).toBeDefined();
    expect(found!.email).toBe('test@example.com');
  });
});
