import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Rental } from "src/rental/entities/rental.entity";
import { CreateRentalDto } from "./dto/create-rental.dto";
import { UpdateRentalDto } from "./dto/update-rental.dto";

@Injectable()
export class RentalService {
  constructor(@InjectModel(Rental) private rentalRepository: typeof Rental) {}
  async create(createRentalDto: CreateRentalDto) {
    return await this.rentalRepository.create(createRentalDto);
  }

  async findAll() {
    let rentals = await this.rentalRepository.findAll({
      include: { all: true },
    });
    if (rentals.length != 0) return rentals;
    return "Empty table";
  }

  async findOne(id: number) {
    let rental = await this.rentalRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!rental) return "not found by this id";
    return rental;
  }

  async update(id: number, updateRentalDto: UpdateRentalDto) {
    let find = await this.rentalRepository.findOne({ where: { id } });
    if (!find) return "not found by this id";
    return await this.rentalRepository.update(updateRentalDto, {
      where: { id },
    });
  }

  async remove(id: number) {
    const rental = await this.rentalRepository.destroy({ where: { id } });
    if (rental != 0) return "Deleted";
  }
}
