import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppLoggerService } from './applogger.service';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new AppLoggerService({
      json: true,
    })
  });

  const config = new DocumentBuilder()
    .setTitle('Weather API')
    .setDescription('API for fetching weather data and managing favorite locations')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector), {excludeExtraneousValues:true}));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
