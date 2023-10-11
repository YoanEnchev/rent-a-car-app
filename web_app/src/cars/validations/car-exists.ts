import { Injectable } from '@nestjs/common';
import { CarService } from '../car.service';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';


@ValidatorConstraint({ name: 'carExists', async: true })
@Injectable()
export class CarExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly carService: CarService) {}

  async validate(carID: number, _args: ValidationArguments) {

    const car = await this.carService.carExists(carID);
    
    return !!car;
  }
}