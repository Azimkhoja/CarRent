import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Rental } from "src/rental/entities/rental.entity";
import { Repository } from "typeorm";
import { CreateRentalDto } from "./dto/create-rental.dto";
import { UpdateRentalDto } from "./dto/update-rental.dto";

@Injectable()
export class RentalService {
  constructor(@InjectRepository(Rental) private rentalRepository: Repository<Rental>) {}
  async create(createRentalDto: CreateRentalDto) {
    return this.rentalRepository.save(createRentalDto);
  }

  async findAll() {
    let rentals = await this.rentalRepository.find();
    if (rentals.length != 0) return rentals;
    return "Empty table";
  }

  async findOne(id: number) {
    let rental = await this.rentalRepository.findOneBy({ id });
    if (!rental) return "not found by this id";
    return rental;
  }

  async update(id: number, updateRentalDto: UpdateRentalDto) {
    let find = await this.rentalRepository.findOneBy({ id });
    if (!find) return "not found by this id";
    return await this.rentalRepository.update({ id }, updateRentalDto);
  }

  async remove(id: number) {
    return this.rentalRepository.delete({ id });
  }
}
