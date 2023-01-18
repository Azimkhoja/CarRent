import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  ForbiddenException,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { LoginCustomerDto } from "./dto/login-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { Customer } from "./entities/customer.entity";
import { Response } from "express";

@ApiTags("Customers")
@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: "Customer malumotlarini kiritish" })
  @ApiResponse({ status: 201, type: Customer })
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }
  @ApiOperation({ summary: "Customer Registration" })
  @ApiResponse({ status: 201, type: Customer })
  @Post("registrate")
  registrate(
    @Body() createCustomerDto: CreateCustomerDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.customerService.registrate(createCustomerDto, res);
  }
  @ApiOperation({ summary: "Customer login" })
  @ApiResponse({ status: 200, type: Customer })
  @Post("login")
  loginCustomer(
    @Body() loginDto: LoginCustomerDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.customerService.loginCustomer(loginDto, res);
  }
  // ===================================== logout ====================================

  @ApiOperation({ summary: "Customer logout" })
  @ApiResponse({ status: 200, type: Customer })
  @Post("logout/:id")
  logout(@Param("id") id: string, @Res({ passthrough: true }) res: Response) {
    return this.customerService.logoutCustomer(+id, res);
  }
  @ApiOperation({ summary: "Barcha Customer ro'yxatini olish" })
  @ApiResponse({ status: 200, type: [Customer] })
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @ApiOperation({ summary: "Customer haqida malumot olish" })
  @ApiResponse({ status: 200, type: Customer })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.customerService.findOne(+id);
  }

  @ApiOperation({ summary: "Customer ga o'zgartirish kiritish" })
  @ApiResponse({ status: 200, type: Customer })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @ApiOperation({ summary: "Customer o'chirish" })
  @ApiResponse({ status: 200, type: Customer })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.customerService.remove(+id);
  }
}
