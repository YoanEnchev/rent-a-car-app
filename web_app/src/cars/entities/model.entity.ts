import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Make } from './make.entity';
import { Car } from './car.entity';

@Entity({name: 'models'})
export class Model {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Volvo' })
  @Column()
  name: string;

  @ManyToOne(() => Make, make => make.id, { eager: false })
  make: Make;

  @OneToMany(() => Car, car => car.model)
  cars: Car[];
}