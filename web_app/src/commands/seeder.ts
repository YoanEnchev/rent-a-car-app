import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { RoleEnum } from '../role/RoleEnum';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class RecordsSeed {
constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
) { }

// Run npx nestjs-command seed:records  to execute it
@Command({ command: 'seed:records', describe: 'create a user' })
async create() {

    const adminRole = await this.roleService.create('admin')
    const moderatorRole = await this.roleService.create('moderator')
    const userRole = await this.roleService.create('user')

    this.userService.create({
        firstName: 'Smith',
        lastName: 'Alex',
        email: 'smith@gmail.com',
        password: 'moderator_pass'
    }, moderatorRole.id);


    this.userService.create({
        firstName: 'Admin',
        lastName: 'admin',
        email: 'admin@gmail.com',
        password: 'admin_pass'
    }, adminRole.id);


    const ordinaryClient = await this.userService.create({
        firstName: 'Joe',
        lastName: 'Doe',
        email: 'joe@gmail.com',
        password: '123456'
    });
}
}