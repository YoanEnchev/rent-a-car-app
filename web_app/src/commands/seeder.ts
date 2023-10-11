import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { RoleService } from 'src/role/role.service';
import { CarService } from 'src/cars/car.service';
import { Model } from 'src/cars/entities/model.entity';
import { Car } from 'src/cars/entities/car.entity';

@Injectable()
export class RecordsSeed {
    constructor(
        private readonly userService: UserService,
        private readonly roleService: RoleService,
        private readonly carService: CarService,
    ) { }
    
    // Run npx nestjs-command seed:records  to execute it
    @Command({ command: 'seed:records', describe: 'create a user' })
    async create() {
    
        // Roles:
        const adminRole = await this.roleService.create('admin')
        const moderatorRole = await this.roleService.create('moderator')
        const userRole = await this.roleService.create('user')
    


        // Users: 
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
    
        const ordinaryClient1 = await this.userService.create({
            firstName: 'Joe',
            lastName: 'Doe',
            email: 'joe@gmail.com',
            password: '123456'
        });

        const ordinaryClient2 = await this.userService.create({
            firstName: 'Iohan',
            lastName: 'Sebastian',
            email: 'iohan@gmail.com',
            password: '123456'
        });



        // Makes:
        const VWMake = await this.carService.createMake({
            name: 'VW',
        });
        const peugeotMake = await this.carService.createMake({
            name: 'Peugeot',
        });
        const mercedesMake = await this.carService.createMake({
            name: 'Mercedes',
        });



        // Models:
        const VWGolfModel = await this.carService.createModel({
            name: 'Golf',
            make: VWMake
        });

        const VWPoloModel = await this.carService.createModel({
            name: 'Polo',
            make: VWMake
        });

        const peugeot308Model = await this.carService.createModel({
            name: '308',
            make: peugeotMake
        });

        const peugeot508Model = await this.carService.createModel({
            name: '508',
            make: peugeotMake
        });

        const mercedesEClassModel = await this.carService.createModel({
            name: 'E Class',
            make: mercedesMake
        });

        const mercedesSClassModel = await this.carService.createModel({
            name: 'S Class',
            make: mercedesMake
        });


        // Cars:
        const carsPromises: Promise<Car>[] = [VWGolfModel, VWPoloModel, peugeot308Model, peugeot508Model, mercedesEClassModel, mercedesSClassModel].map((model: Model) => {
            
            const minYear = 2016;
            const maxYEAR = new Date().getFullYear();

            const randomYear = Math.floor(Math.random() * (maxYEAR - minYear + 1)) + minYear;
            
            return this.carService.createCar({
                modelID: model.id,
                year: randomYear
            })
        })


        // Bookings
        Promise.allSettled(carsPromises).then(([cars]) => {

        });
    }
}