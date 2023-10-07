import { NestFactory } from '@nestjs/core';
// import { HomeModule } from './home/home.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  console.log('------->');
  console.log(join(__dirname, 'views'));

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.setViewEngine('hbs')

  await app.listen(3000);
}

bootstrap();
