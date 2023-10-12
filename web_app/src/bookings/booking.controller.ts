import { Controller, Get, Param, Post, Redirect, Render } from '@nestjs/common';
import { CarService } from 'src/cars/car.service';
import { BookingService } from './booking.service';
import * as express from 'express';

@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}


  @Post('/book-car/:carID')
  @Redirect('/')
  async bookCar(@Param('carID') carID: number, req: express.Request) {

    this.bookingService.createBooking(req)

    return {}
  }
}
