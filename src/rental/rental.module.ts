import { Module } from "@nestjs/common";
import { RentalService } from "./rental.service";
import { RentalController } from "./rental.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Rental } from "./entities/rental.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [SequelizeModule.forFeature([Rental]), JwtModule],
  controllers: [RentalController],
  providers: [RentalService],
})
export class RentalModule {}
