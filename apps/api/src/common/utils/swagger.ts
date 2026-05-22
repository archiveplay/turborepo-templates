import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { cleanupOpenApiDoc } from 'nestjs-zod';

export const makeSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Swagger')
    .setDescription('Swagger api description')
    .setVersion('1.0')
    .addTag('swagger')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, cleanupOpenApiDoc(document));
};
