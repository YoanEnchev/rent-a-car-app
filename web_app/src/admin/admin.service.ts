import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminService {
  constructor(

  ) {}
  
  getHello() {
    return 'hi'
  }

}