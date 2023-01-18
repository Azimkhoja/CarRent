import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CarImage } from "src/car_image/entities/car_image.entity";
import { CreateCarImageDto } from "./dto/create-car_image.dto";
import { UpdateCarImageDto } from "./dto/update-car_image.dto";

@Injectable()
export class CarImageService {
  constructor(
    @InjectModel(CarImage) private car_imageRepository: typeof CarImage
  ) {}
  async create(createCarImageDto: CreateCarImageDto) {
    return await this.car_imageRepository.create(createCarImageDto);
  }

  async findAll() {
    let car_images = await this.car_imageRepository.findAll({
      include: { all: true },
    });
    if (car_images.length != 0) return car_images;
    return "Empty table";
  }

  async findOne(id: number) {
    let car_image = await this.car_imageRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!car_image) return "not found by this id";
    return car_image;
  }

  async update(id: number, updateCarImageDto: UpdateCarImageDto) {
    let find = await this.car_imageRepository.findOne({ where: { id } });
    if (!find) return "not found by this id";
    return await this.car_imageRepository.update(updateCarImageDto, {
      where: { id },
    });
  }

  async remove(id: number) {
    const car_image = await this.car_imageRepository.destroy({ where: { id } });
    if (car_image != 0) return "Deleted";
  }
}
