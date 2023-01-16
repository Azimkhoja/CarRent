import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Owner } from "src/owner/entities/owner.entity";
import { CreateOwnerDto } from "./dto/create-owner.dto";
import { UpdateOwnerDto } from "./dto/update-owner.dto";

@Injectable()
export class OwnerService {
  constructor(
    @InjectModel(Owner) private ownerRepository: typeof Owner
  ) {}
  async create(createOwnerDto: CreateOwnerDto) {
    return await this.ownerRepository.create(createOwnerDto);
  }

  async findAll() {
    let owners = await this.ownerRepository.findAll({include: {all: true}});
    if (owners.length != 0) return owners;
    return "Empty table";
  }

  async findOne(id: number) {
    let owner = await this.ownerRepository.findOne({where: {id}, include: {all:true}});
    if (!owner) return "not found by this id";
    return owner;
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
    let find = await this.ownerRepository.findOne({where: {id}});
    if (!find) return "not found by this id";
    return await this.ownerRepository.update(updateOwnerDto, {where: {id}});
  }

  async remove(id: number) {
    return this.ownerRepository.destroy({where: {id} });
  }
}
