import { Controller, Request, Response, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from './google-oauth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {}

  @Get('google/redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Request() req, @Response() res) {
    // Redireciona o usuário após a autenticação bem-sucedida
    // console.log('\ngoogleAuthRedirect()\n');
    // console.log(req.user);
    const { access_token } = await this.authService.login(req.user);
    res.json({
      access_token,
    });
    // return {
    //   access_token,
    // };
    // res.redirect(`http://localhost:3000?token=${access_token}`);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
