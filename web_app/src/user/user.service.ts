import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { RoleEnum } from 'src/role/RoleEnum';
import { RegistrationRequest } from 'src/auth/validations/user.register';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getHello() {
    return 'hi'
  }

  async create(рegistrationRequest: RegistrationRequest, roleId?: RoleEnum): Promise<User> {
    
    return this.usersRepository.save(
      this.usersRepository.create({...рegistrationRequest, ...{
        role: {
          id: roleId ?? RoleEnum.user
        }
      }}),
    );
  }

  find(): Promise<User[]> {
    return this.usersRepository.find();
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

  async delete(id: User['id']): Promise<void> {
    await this.usersRepository.delete(id);
  }
}