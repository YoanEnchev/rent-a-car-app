import { Controller, Get, Render } from '@nestjs/common';
import { CarService } from './car.service';

@Controller()
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get('/cars')
  @Render('cars/index')
  async listCars() {
    console.log('11111111111111111111')
    console.log('-------->', await this.carService.find())
    return {
      cars: await this.carService.find()
    }
  }
}
