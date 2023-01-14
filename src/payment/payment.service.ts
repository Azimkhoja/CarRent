import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "src/payment/entities/payment.entity";
import { Repository } from "typeorm";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@Injectable()
export class PaymentService {
  constructor(@InjectRepository(Payment) private paymentRepository: Repository<Payment>) {}
  async create(createPaymentDto: CreatePaymentDto) {
    return this.paymentRepository.save(createPaymentDto);
  }

  async findAll() {
    let payments = await this.paymentRepository.find();
    if (payments.length != 0) return payments;
    return "Empty table";
  }

  async findOne(id: number) {
    let payment = await this.paymentRepository.findOneBy({ id });
    if (!payment) return "not found by this id";
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    let find = await this.paymentRepository.findOneBy({ id });
    if (!find) return "not found by this id";
    return await this.paymentRepository.update({ id }, updatePaymentDto);
  }

  async remove(id: number) {
    return this.paymentRepository.delete({ id });
  }
}
