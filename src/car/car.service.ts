import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Car } from "src/car/entities/car.entity";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";

@Injectable()
export class CarService {
  constructor(@InjectModel(Car) private carRepository: typeof Car) {}
  async create(createCarDto: CreateCarDto) {
    return await this.carRepository.create(createCarDto);
  }

  async findAll() {
    let cars = await this.carRepository.findAll({ include: { all: true } });
    if (cars.length != 0) return cars;
    return "Empty table";
  }

  async findOne(id: number) {
    let car = await this.carRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!car) return "not found by this id";
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    let find = await this.carRepository.findOne({ where: { id } });
    if (!find) return "not found by this id";
    return await this.carRepository.update(updateCarDto, { where: { id } });
  }

  async remove(id: number) {
    const car = await this.carRepository.destroy({ where: { id } });
    if (car != 0) return "Deleted";
    return "Car not fount by this id";
  }
}
