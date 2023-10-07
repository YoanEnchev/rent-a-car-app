import { Controller, Get, Post, HttpCode, Render, HttpStatus, Body } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class AuthController {


  @Get('/register')
  @Render('auth/register')
  showRegistrationForm() {
    return {}
  }


}
