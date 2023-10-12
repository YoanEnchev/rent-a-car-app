import { Injectable } from '@nestjs/common';
import { BookingCreateRequest } from './validators/booking.create';
import { Booking } from './booking.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ISessionAttributes } from 'src/session/ISessionAttributes';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  getHello(): string {
    return 'Hello World! xxxzzz';
  }

  async createBooking(bookingRequest: BookingCreateRequest): Promise<Booking> {
    
    return await this.bookingRepository.create({
      startDate: bookingRequest.startDate,
      endDate: bookingRequest.endDate,
      car: {
        id: bookingRequest.carID
      },
      user: {
        id: bookingRequest.userID
      }
    })
  }

  async delete(id: Booking['id']): Promise<void> {
    await this.bookingRepository.delete(id);
  }
}
