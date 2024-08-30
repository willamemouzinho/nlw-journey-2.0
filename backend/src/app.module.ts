import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EnvModule } from './env/env.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TesteModule } from './teste/teste.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: envSchema.parse,
      isGlobal: true,
    }),
    PrismaModule,
    EnvModule,
    AuthModule,
    UsersModule,
    TesteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
