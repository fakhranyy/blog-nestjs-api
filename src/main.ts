import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LazyModuleLoader } from '@nestjs/core';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 const lazyModuleLoader = app.get(LazyModuleLoader);
  await app.listen(3000);
}
bootstrap();
