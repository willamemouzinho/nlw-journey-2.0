import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(profile: any): Promise<any> {
    // console.log('\nvalidateUser()\n');
    // console.log({ profile });
    const user = await this.usersService.findOrCreate(profile);
    return user;
  }

  async login(user: any) {
    // console.log('\nlogin()\n');
    // console.log({ user });
    const payload = {
      given_name: user.given_name,
      family_name: user.family_name,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
