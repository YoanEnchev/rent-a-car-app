import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Model } from './model.entity';

@Entity({name: 'makes'})
export class Make {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Volvo' })
  @Column()
  name: string;


  @OneToMany(() => Model, model => model.make)
  models: Model[];
}