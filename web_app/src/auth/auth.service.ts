import { Injectable } from '@nestjs/common';
import { RegistrationRequest } from './validations/user.register';
import { LoginRequest } from './validations/user.login';
import { validate } from 'class-validator';
import { UserService } from 'src/user/user.service';
import * as express from 'express';
import * as bcrypt from 'bcryptjs';
import { ISessionAttributes } from 'src/session/ISessionAttributes';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {}

  async handleRegistration(req: express.Request) {
    const registrationRequest: RegistrationRequest = Object.assign(new RegistrationRequest(), req.body);

    const errors = await validate(registrationRequest);

    if (errors.length > 0) {

      const sessionData = req.session as ISessionAttributes;

      sessionData.errorMessage = Object.values(errors[0].constraints)[0]
      return { url: '/register' };
    }

    const user: User = await this.userService.create(registrationRequest)
    this.loginUser(req, user)

    return { url: '/succ-registration' }
  }

  async handleLogin(req: express.Request) {

    const loginRequest: LoginRequest = Object.assign(new LoginRequest(), req.body);
    console.log('req.body: ', loginRequest)

    const errors = await validate(loginRequest);
    const sessionData = req.session as ISessionAttributes;

    if (errors.length > 0) {

      sessionData.errorMessage = Object.values(errors[0].constraints)[0]
      return { url: '/login' };
    }

    const user: User = await this.userService.findByEmail(loginRequest.email)

    if (!user) {
      sessionData.errorMessage = 'User with such email does not exist.'
      return { url: '/login' };
    }

    const isValidPassword = await bcrypt.compare(
      loginRequest.password,
      user.password
    );

    if (!isValidPassword) {
      sessionData.errorMessage = 'Invalid password.'
      return { url: '/login' };
    }

    this.loginUser(req, user)
    return {url: '/succ-login'}
  }

  loginUser(req: express.Request, user: User) {
    const sessionData = req.session as ISessionAttributes;

    sessionData.user = user;
    sessionData.userIsAdmin = user.isAdmin();
    sessionData.userIsModerator = user.isModerator();
  }

  logoutUser(req: express.Request) {
    const sessionData = req.session as ISessionAttributes;

    sessionData.user = null
    sessionData.userIsAdmin = null;
    sessionData.userIsModerator = null;
  }

  getHello(): string {
    return 'Hello World! xxxzzz';
  }
}
