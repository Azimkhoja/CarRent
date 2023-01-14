import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CarImage } from "src/car_image/entities/car_image.entity";
import { Repository } from "typeorm";
import { CreateCarImageDto } from "./dto/create-car_image.dto";
import { UpdateCarImageDto } from "./dto/update-car_image.dto";

@Injectable()
export class CarImageService {
  constructor(
    @InjectRepository(CarImage)
    private car_imageRepository: Repository<CarImage>
  ) {}
  async create(createCarImageDto: CreateCarImageDto) {
    return this.car_imageRepository.save(createCarImageDto);
  }

  async findAll() {
    let car_images = await this.car_imageRepository.find();
    if (car_images.length != 0) return car_images;
    return "Empty table";
  }

  async findOne(id: number) {
    let car_image = await this.car_imageRepository.findOneBy({ id });
    if (!car_image) return "not found by this id";
    return car_image;
  }

  async update(id: number, updateCarImageDto: UpdateCarImageDto) {
    let find = await this.car_imageRepository.findOneBy({ id });
    if (!find) return "not found by this id";
    return await this.car_imageRepository.update({ id }, updateCarImageDto);
  }

  async remove(id: number) {
    return this.car_imageRepository.delete({ id });
  }
}
