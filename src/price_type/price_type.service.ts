import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PriceType } from "src/price_type/entities/price_type.entity";
import { Repository } from "typeorm";
import { CreatePriceTypeDto } from "./dto/create-price_type.dto";
import { UpdatePriceTypeDto } from "./dto/update-price_type.dto";

@Injectable()
export class PriceTypeService {
  constructor(
    @InjectRepository(PriceType)
    private price_typeRepository: Repository<PriceType>
  ) {}
  async create(createPrice_typeDto: CreatePriceTypeDto) {
    return this.price_typeRepository.save(createPrice_typeDto);
  }

  async findAll() {
    let price_types = await this.price_typeRepository.find();
    if (price_types.length != 0) return price_types;
    return "Empty table";
  }

  async findOne(id: number) {
    let price_type = await this.price_typeRepository.findOneBy({ id });
    if (!price_type) return "not found by this id";
    return price_type;
  }

  async update(id: number, updatePrice_typeDto: UpdatePriceTypeDto) {
    let find = await this.price_typeRepository.findOneBy({ id });
    if (!find) return "not found by this id";
    return await this.price_typeRepository.update({ id }, updatePrice_typeDto);
  }

  async remove(id: number) {
    return this.price_typeRepository.delete({ id });
  }
}
