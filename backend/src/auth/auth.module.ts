import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { EnvModule } from 'src/env/env.module';
import { UsersModule } from 'src/users/users.module';
import { GoogleOauthStrategy } from './google-oauth.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EnvService } from 'src/env/env.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    EnvModule,
    UsersModule,
    PassportModule.register({ defaultStrategy: 'google' }),
    JwtModule.registerAsync({
      imports: [EnvModule],
      useFactory: async (envService: EnvService) => {
        return {
          secret: envService.get('JWT_SECRET'),
          signOptions: { expiresIn: '15m' },
        };
      },
      inject: [EnvService],
    }),
  ],
  providers: [AuthService, GoogleOauthStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
