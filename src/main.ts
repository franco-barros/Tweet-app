import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //  Habilitar CORS global (ajustar en producción)
  app.enableCors({
    origin: '*', // Cambiar por tu dominio en deploy
    credentials: true,
  });

  //  Prefijo global para todas las rutas
  app.setGlobalPrefix('api');

  //  Pipes globales (para DTOs y validaciones)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades no definidas
      forbidNonWhitelisted: true, // lanza error si llegan props desconocidas
      transform: true, // convierte tipos (string a number, etc.)
    }),
  );

  // Guard global (JWT Auth)
  // Requiere que tu JwtAuthGuard use Reflector e implemente @Public()
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // Interceptor global (logging)
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Filtro global de excepciones
  app.useGlobalFilters(new AllExceptionsFilter());

  // Levantar servidor
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`Server running on http://localhost:${PORT}/api`);
}

bootstrap();
