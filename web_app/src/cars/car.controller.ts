import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class CarController {
  constructor() {}

  @Get()
  @Render('home')
  getHello() {
    return {}
  }
}
