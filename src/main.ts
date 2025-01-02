import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ResponseInterceptor} from './config/response.interceptor';
import * as dotenv from 'dotenv';
import {AllExceptionsFilter} from "./common/filter-exception";

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(
  //     new ValidationPipe({
  //       transform: true, // Automatically transform payloads
  //     }),
  // );
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
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(process.env.PORT ?? 3000,()=>console.log(`Server started on port ${process.env.PORT}`));
}
bootstrap();
