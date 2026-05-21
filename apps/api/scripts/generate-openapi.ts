import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import { AppModule } from '../src/app.module';

async function run() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Swagger')
    .setDescription('Swagger api description')
    .setVersion('1.0')
    .addTag('swagger')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, cleanupOpenApiDoc(document));

  writeFileSync('../../packages/api/openapi.json', JSON.stringify(document));

  await app.close(); // important
}
run();
