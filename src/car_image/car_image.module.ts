import { Module } from "@nestjs/common";
import { CarImageService } from "./car_image.service";
import { CarImageController } from "./car_image.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarImage } from "./entities/car_image.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CarImage])],
  controllers: [CarImageController],
  providers: [CarImageService],
})
export class CarImageModule {}
