import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');
  console.log('Backend MISEDA ruează pe http://localhost:' + port);
  console.log('Health check: http://localhost:' + port + '/health');
  console.log('Auth API: http://localhost:' + port + '/auth');
}
bootstrap();