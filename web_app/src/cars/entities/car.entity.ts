import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Model } from './model.entity';
import { User } from 'src/user/user.entity';
import { Booking } from 'src/bookings/booking.entity';

@Entity({name: 'cars'})
export class Car {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 2020 })
  @Column()
  year: number;

  @ManyToOne(() => Model, model => model.id, { eager: false })
  model: Model;

  @ManyToMany(() => User, user => user.bookings)
  @JoinTable()
  bookings: Booking[];
}