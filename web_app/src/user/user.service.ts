import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { User } from '../user/user.entity';
import { RoleEnum } from 'src/role/RoleEnum';
//
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getHello() {
    return 'hi'
  }

  async create(createProfileDto: CreateUserDto, roleId?: RoleEnum): Promise<User> {
    console.log('create 1')
    console.log(await this.usersRepository.find())

    console.log('create 2')
    return this.usersRepository.save(
      this.usersRepository.create({...createProfileDto, ...{
        role: {
          id: roleId ?? RoleEnum.user
        }
      }}),
    );
  }

  findByEmail(email: string): Promise<User|null> {
    return this.usersRepository.findOne({
      where: {email},
    });
  }

  update(id: User['id'], payload: DeepPartial<User>): Promise<User> {
    return this.usersRepository.save(
      this.usersRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: User['id']): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
}