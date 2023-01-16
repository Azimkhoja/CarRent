import { Module } from "@nestjs/common";
import { CarImageService } from "./car_image.service";
import { CarImageController } from "./car_image.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { CarImage } from "./entities/car_image.entity";

@Module({
  imports: [SequelizeModule.forFeature([CarImage])],
  controllers: [CarImageController],
  providers: [CarImageService],
})
export class CarImageModule {}
