import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EnvService } from 'src/env/env.service';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private authService: AuthService,
    private envService: EnvService,
  ) {
    super({
      clientID: envService.get('GOOGLE_CLIENT_ID'),
      clientSecret: envService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3333/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    // console.log('\nvalidate()\n');
    // console.log({ accessToken });
    // console.log({ refreshToken });
    // console.log({ profile });
    // console.log({ done });
    const user = await this.authService.validateUser(profile._json);
    done(null, user);
  }
}
