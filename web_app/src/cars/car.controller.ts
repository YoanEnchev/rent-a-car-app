import { Controller, Get, Render } from '@nestjs/common';
import { CarService } from './car.service';

@Controller()
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get('/cars')
  @Render('cars/index')
  async listCars() {

    return {
      cars: await this.carService.find()
    }
  }
}
