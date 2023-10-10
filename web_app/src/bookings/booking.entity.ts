import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { Car } from 'src/cars/entities/car.entity';

@Entity({name: 'bookings'})
export class Booking {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.bookings)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Car, car => car.bookings)
  @JoinColumn()
  car: Car;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}