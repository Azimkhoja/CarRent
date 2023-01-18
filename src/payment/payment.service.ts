import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Payment } from "src/payment/entities/payment.entity";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment) private paymentRepository: typeof Payment
  ) {}
  async create(createPaymentDto: CreatePaymentDto) {
    return await this.paymentRepository.create(createPaymentDto);
  }

  async findAll() {
    let payments = await this.paymentRepository.findAll({
      include: { all: true },
    });
    if (payments.length != 0) return payments;
    return "Empty table";
  }

  async findOne(id: number) {
    let payment = await this.paymentRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!payment) return "not found by this id";
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    let find = await this.paymentRepository.findOne({ where: { id } });
    if (!find) return "not found by this id";
    return await this.paymentRepository.update(updatePaymentDto, {
      where: { id },
    });
  }

  async remove(id: number) {
    const payment = await this.paymentRepository.destroy({ where: { id } });
    if (payment != 0) return "Deleted";
  }
}
