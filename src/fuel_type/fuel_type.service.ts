import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FuelType } from "src/fuel_type/entities/fuel_type.entity";
import { Repository } from "typeorm";
import { CreateFuelTypeDto } from "./dto/create-fuel_type.dto";
import { UpdateFuelTypeDto } from "./dto/update-fuel_type.dto";

@Injectable()
export class FuelTypeService {
  constructor(
    @InjectRepository(FuelType)
    private fuel_typeRepository: Repository<FuelType>
  ) {}
  async create(createFuelTypeDto: CreateFuelTypeDto) {
    return this.fuel_typeRepository.save(createFuelTypeDto);
  }

  async findAll() {
    let fuel_types = await this.fuel_typeRepository.find();
    if (fuel_types.length != 0) return fuel_types;
    return "Empty table";
  }

  async findOne(id: number) {
    let fuel_type = await this.fuel_typeRepository.findOneBy({ id });
    if (!fuel_type) return "not found by this id";
    return fuel_type;
  }

  async update(id: number, updateFuelTypeDto: UpdateFuelTypeDto) {
    let find = await this.fuel_typeRepository.findOneBy({ id });
    if (!find) return "not found by this id";
    return await this.fuel_typeRepository.update({ id }, updateFuelTypeDto);
  }

  async remove(id: number) {
    return this.fuel_typeRepository.delete({ id });
  }
}
