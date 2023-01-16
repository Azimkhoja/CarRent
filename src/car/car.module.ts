import { Module } from "@nestjs/common";
import { CarService } from "./car.service";
import { CarController } from "./car.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Car } from "./entities/car.entity";

@Module({
  imports: [SequelizeModule.forFeature([Car])],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
