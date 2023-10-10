import { Controller, Get, Post, Render, Redirect, Req } from '@nestjs/common';
import * as express from 'express';
import { ISessionAttributes } from 'src/session/ISessionAttributes';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) {}


  @Get('/register')
  @Render('auth/register')
  showRegistrationForm(@Req() req: express.Request) {
    const sessionData = req.session as ISessionAttributes;

    return {
      errorMessage: sessionData.errorMessage
    }
  }

  @Post('/register')
  @Redirect('', 302) // Redirect url is determined in service.
  async register(@Req() req: express.Request) {

    return this.authService.handleRegistration(req)
  }

  @Get('/succ-registration')
  @Render('auth/successful-registration')
  successfulRegistration() {
    return {}
  }

  @Get('/login')
  @Render('auth/login')
  showLoginForm(@Req() req: express.Request) {
    const sessionData = req.session as ISessionAttributes;

    return {
      errorMessage: sessionData.errorMessage
    }
  }

  @Post('/login')
  @Redirect('', 302) // Redirect url is determined in service.
  async login(@Req() req: express.Request) {

    return this.authService.handleLogin(req)
  }

  @Get('/succ-login')
  @Render('auth/successful-login')
  successfulLogin() {
    return {}
  }

  @Post('/logout')
  @Redirect('/succ-logout', 302)
  async logout(@Req() req: express.Request) {

    return this.authService.logoutUser(req)
  }

  @Get('/succ-logout')
  @Render('auth/successful-logout')
  successfulLogout() {
    return {}
  }
}
