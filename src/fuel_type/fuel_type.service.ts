import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FuelType } from "src/fuel_type/entities/fuel_type.entity";
import { CreateFuelTypeDto } from "./dto/create-fuel_type.dto";
import { UpdateFuelTypeDto } from "./dto/update-fuel_type.dto";

@Injectable()
export class FuelTypeService {
  constructor(
    @InjectModel(FuelType) private fuel_typeRepository: typeof FuelType
  ) {}
  async create(createFuelTypeDto: CreateFuelTypeDto) {
    return await this.fuel_typeRepository.create(createFuelTypeDto);
  }

  async findAll() {
    let fuel_types = await this.fuel_typeRepository.findAll({
      include: { all: true },
    });
    if (fuel_types.length != 0) return fuel_types;
    return "Empty table";
  }

  async findOne(id: number) {
    let fuel_type = await this.fuel_typeRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!fuel_type) return "not found by this id";
    return fuel_type;
  }

  async update(id: number, updateFuelTypeDto: UpdateFuelTypeDto) {
    let find = await this.fuel_typeRepository.findOne({ where: { id } });
    if (!find) return "not found by this id";
    return await this.fuel_typeRepository.update(updateFuelTypeDto, {
      where: { id },
    });
  }

  async remove(id: number) {
    const fuel_type = await this.fuel_typeRepository.destroy({ where: { id } });
    if (fuel_type != 0) return "Deleted";
  }
}
