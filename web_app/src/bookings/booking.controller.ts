import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class BookingController {
  constructor() {}

  @Get()
  @Render('home')
  getHello() {
    return {}
  }
}
