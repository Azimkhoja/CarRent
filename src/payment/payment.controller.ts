import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Payment } from "./entities/payment.entity";

@ApiTags("Payments")
@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: "Payment malumotlarini kiritish" })
  @ApiResponse({ status: 200, type: Payment })
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @ApiOperation({ summary: "Barcha Payment ro'yxatini olish" })
  @ApiResponse({ status: 200, type: [Payment] })
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @ApiOperation({ summary: "Payment haqida malumot olish" })
  @ApiResponse({ status: 200, type: Payment })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentService.findOne(+id);
  }

  @ApiOperation({ summary: "Payment ga o'zgartirish kiritish" })
  @ApiResponse({ status: 200, type: Payment })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @ApiOperation({ summary: "Payment o'chirish" })
  @ApiResponse({ status: 200, type: Payment })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentService.remove(+id);
  }
}
