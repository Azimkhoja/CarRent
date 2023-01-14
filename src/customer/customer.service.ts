import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "src/customer/entities/customer.entity";
import { Repository } from "typeorm";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private customerRepository: Repository<Customer>
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    return this.customerRepository.save(createCustomerDto);
  }

  async findAll() {
    let customers = await this.customerRepository.find();
    if (customers.length != 0) return customers;
    return "Empty table";
  }

  async findOne(id: number) {
    let customer = await this.customerRepository.findOneBy({ id });
    if (!customer) return "not found by this id";
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    let find = await this.customerRepository.findOneBy({ id });
    if (!find) return "not found by this id";
    return await this.customerRepository.update({ id }, updateCustomerDto);
  }

  async remove(id: number) {
    return this.customerRepository.delete({ id });
  }
}
