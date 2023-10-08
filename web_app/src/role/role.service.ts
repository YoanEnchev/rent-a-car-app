import { Injectable } from '@nestjs/common';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
      ) {}
    
    getHello() {
      return 'hi'
    }

    async create(name: string): Promise<Role> {

      return this.roleRepository.save(
        this.roleRepository.create({name}),
      );
    }
}
