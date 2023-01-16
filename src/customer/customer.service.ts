import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Customer } from "src/customer/entities/customer.entity";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer) private customerRepository: typeof Customer
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    return await this.customerRepository.create(createCustomerDto);
  }

  async findAll() {
    let customers = await this.customerRepository.findAll({include: {all: true}});
    if (customers.length != 0) return customers;
    return "Empty table";
  }

  async findOne(id: number) {
    let customer = await this.customerRepository.findOne({where: {id}, include: {all:true}});
    if (!customer) return "not found by this id";
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    let find = await this.customerRepository.findOne({where: {id}});
    if (!find) return "not found by this id";
    return await this.customerRepository.update(updateCustomerDto, {where: {id}});
  }

  async remove(id: number) {
    return this.customerRepository.destroy({where: {id} });
  }
}
