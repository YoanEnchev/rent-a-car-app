import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './entities/model.entity';
import { Make } from './entities/make.entity';
import { Car } from './entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Model, Make, Car])],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService]
})
export class CarModule {}
