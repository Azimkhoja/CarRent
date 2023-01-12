import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Owner } from "src/owner/entities/owner.entity";
import { Repository } from "typeorm";
import { CreateOwnerDto } from "./dto/create-owner.dto";
import { UpdateOwnerDto } from "./dto/update-owner.dto";

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>
  ) {}
  async create(createOwnerDto: CreateOwnerDto) {
    return this.ownerRepository.save(createOwnerDto)
  }

  async findAll() {
    let owners = await this.ownerRepository.find();
    if(owners.length != 0)
      return owners
    return "Empty table"
  }

  async findOne(id: number) {
    let owner = await this.ownerRepository.findOneBy({id})
    if(!owner)
      return "not found by this id"
    return owner
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
    let find = await this.ownerRepository.findOneBy({id})
    if(!find)
      return "not found by this id"
    return  await this.ownerRepository.update({id}, updateOwnerDto)
    
  }

  async remove(id: number) {
    return this.ownerRepository.delete({id
    })
  }
}
