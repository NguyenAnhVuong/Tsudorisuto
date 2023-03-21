import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3008;
  const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*',
    origin: CLIENT_URL,
    credentials: true,
  });
  await app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}`);
  });
}
bootstrap();
