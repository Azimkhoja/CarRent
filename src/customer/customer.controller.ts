import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { LoginCustomerDto } from "./dto/login-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { Customer } from "./entities/customer.entity";

@ApiTags("Customers")
@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }
  @Post("registrate")
  registrate(
    @Body() createCustomerDto: CreateCustomerDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.customerService.registrate(createCustomerDto, res);
  }
  @ApiOperation({ summary: "login Admin" })
  @ApiResponse({ status: 200, type: Customer })
  @Post("login")
  login(@Body() loginDto: LoginCustomerDto, @Res({ passthrough: true }) res: Response) {
    return this.customerService.login(loginDto, res);
    }   
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(":id")
  
  update(
    @Param("id") id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.customerService.remove(+id);
  }
}
