import { Module } from "@nestjs/common";
import { FuelTypeService } from "./fuel_type.service";
import { FuelTypeController } from "./fuel_type.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FuelType } from "./entities/fuel_type.entity";

@Module({
  imports: [TypeOrmModule.forFeature([FuelType])],
  controllers: [FuelTypeController],
  providers: [FuelTypeService],
})
export class FuelTypeModule {}
