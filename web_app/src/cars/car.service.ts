import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Make } from './entities/make.entity';
import { Repository } from 'typeorm';
import { Model } from './entities/model.entity';
import { Car } from './entities/car.entity';
import CreateMake from './seed_interfaces/make.create';
import CreateModel from './seed_interfaces/model.create';
import { CarActionRequest } from './validations/car-action';
import { CarCreateRequest } from './validations/car-create';
import { CarEditRequest } from './validations/car-edit';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Make)
    private makeRepository: Repository<Make>,

    @InjectRepository(Model)
    private modelRepository: Repository<Model>,

    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  async createMake(makeRequest: CreateMake): Promise<Make> {
    
    const newMake = new Make();
    newMake.name = makeRequest.name;

    return this.makeRepository.save( 
        this.makeRepository.create(newMake)
    );
  }

  async createModel(model: CreateModel): Promise<Model> {
    return this.modelRepository.save( 
      this.modelRepository.create(model)
    )
  }

  async createCar(car: CarCreateRequest): Promise<Car> {
    return this.carRepository.save(
      this.carRepository.create({
        model: {
          id: car.modelID
        },
        year: car.year
    }));
  }

  async editCar(car: CarEditRequest): Promise<void> {
    this.carRepository.update(car.id, {
      year: car.year
    })
  }

  async carExists(id: number): Promise<boolean> {
    return !!this.carRepository.findOne({
      where: {id}
    })
  }

  async modelExists(id: number): Promise<boolean> {
    return !!this.modelRepository.findOne({
      where: {id}
    })
  }

  async find(): Promise<Car[]> {
    return this.carRepository.find();
  }
}
