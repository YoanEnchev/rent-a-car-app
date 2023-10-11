import { Injectable } from '@nestjs/common';
import { CarService } from '../car.service';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';


@ValidatorConstraint({ name: 'modelExists', async: true })
@Injectable()
export class ModelExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly carService: CarService) {}

  async validate(modelID: number, _args: ValidationArguments) {

    const model = await this.carService.modelExists(modelID);
    
    return !!model;
  }
}