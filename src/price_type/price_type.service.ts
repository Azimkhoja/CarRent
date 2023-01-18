import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PriceType } from "src/price_type/entities/price_type.entity";
import { CreatePriceTypeDto } from "./dto/create-price_type.dto";
import { UpdatePriceTypeDto } from "./dto/update-price_type.dto";

@Injectable()
export class PriceTypeService {
  constructor(
    @InjectModel(PriceType) private price_typeRepository: typeof PriceType
  ) {}
  async create(createPriceTypeDto: CreatePriceTypeDto) {
    return await this.price_typeRepository.create(createPriceTypeDto);
  }

  async findAll() {
    let price_types = await this.price_typeRepository.findAll({
      include: { all: true },
    });
    if (price_types.length != 0) return price_types;
    return "Empty table";
  }

  async findOne(id: number) {
    let price_type = await this.price_typeRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!price_type) return "not found by this id";
    return price_type;
  }

  async update(id: number, updatePriceTypeDto: UpdatePriceTypeDto) {
    let find = await this.price_typeRepository.findOne({ where: { id } });
    if (!find) return "not found by this id";
    return await this.price_typeRepository.update(updatePriceTypeDto, {
      where: { id },
    });
  }

  async remove(id: number) {
    const price_type = await this.price_typeRepository.destroy({
      where: { id },
    });
    if (price_type != 0) return "Deleted";
  }
}
