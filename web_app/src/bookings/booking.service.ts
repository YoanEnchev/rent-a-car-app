import { Injectable, Req } from '@nestjs/common';
import { BookingCreateRequest } from './validators/booking.create';
import { Booking } from './booking.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as express from 'express';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  getHello(): string {
    return 'Hello World! xxxzzz';
  }

  async createBooking(@Req() req: express.Request): Promise<Booking> {
    
    const bookingRequest: BookingCreateRequest = Object.assign(new BookingCreateRequest(), req.body)

    return await this.bookingRepository.save(this.bookingRepository.create(bookingRequest))
  }

  async delete(id: Booking['id']): Promise<void> {
    await this.bookingRepository.delete(id);
  }
}
