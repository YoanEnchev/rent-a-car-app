import { Controller, Get, Post, HttpCode, Render, HttpStatus, Body } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class AuthController {

  constructor(private readonly userService: UserService) {}


  @Get('/register')
  @Render('auth/register')
  showRegistrationForm() {
    return {}
  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {

    try {
      await this.userService.create(createUserDto)
    }
    catch (err) {
      console.log('Catch Block')
      console.log(err)
    }

    return {}
  }
}
