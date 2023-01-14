import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "src/car/entities/car.entity";
import { Repository } from "typeorm";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";

@Injectable()
export class CarService {
  constructor(@InjectRepository(Car) private carRepository: Repository<Car>) {}
  async create(createCarDto: CreateCarDto) {
    return this.carRepository.save(createCarDto);
  }

  async findAll() {
    let cars = await this.carRepository.find();
    if (cars.length != 0) return cars;
    return "Empty table";
  }

  async findOne(id: number) {
    let car = await this.carRepository.findOneBy({ id });
    if (!car) return "not found by this id";
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    let find = await this.carRepository.findOneBy({ id });
    if (!find) return "not found by this id";
    return await this.carRepository.update({ id }, updateCarDto);
  }

  async remove(id: number) {
    return this.carRepository.delete({ id });
  }
}
