import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {HttpExceptionFilter} from './config/http-exception.filter';
import {ResponseInterceptor} from './config/response.interceptor';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that are not in the DTO
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );

  // Create Swagger options
  const options = new DocumentBuilder()
    .setTitle('COLLABDIARY USER API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('collab-diary')
    .build();

  // Create the document
  const document = SwaggerModule.createDocument(app, options);

  // Set up Swagger module
  SwaggerModule.setup('api-docs', app, document);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(process.env.PORT ?? 3000,()=>console.log(`Server started on port ${process.env.PORT}`));
}
bootstrap();
