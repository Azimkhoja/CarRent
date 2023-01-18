import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Customer } from "src/customer/entities/customer.entity";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import * as bcrypt from "bcryptjs";
import { Response } from "express";
import { TokenService } from "src/token/token.service";
import { LoginCustomerDto } from "./dto/login-customer.dto";

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer) private customerRepository: typeof Customer,
    private tokenService: TokenService
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    return await this.customerRepository.create(createCustomerDto);
  }

  async registrate(createCustomerDto: CreateCustomerDto, res: Response) {
    const is_customer = await this.customerRepository.findOne({
      where: { email: createCustomerDto.email },
    });
    if (is_customer) {
      throw new HttpException(
        "this email is already exists",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashedPassword = await bcrypt.hash(createCustomerDto.password, 7);
    const customer = await this.customerRepository.create({
      ...createCustomerDto,
      password: hashedPassword,
    });
    customer.is_active = true;
    customer.save();
    const tokens = await this.tokenService.getTokens(
      customer.id,
      customer.is_active,
      customer.email,
      "customer"
    );
    const newCustomer = await this.tokenService.updateRefreshToken(
      customer.id,
      tokens.refresh_token,
      this.customerRepository
    );

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return {
      newCustomer,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }
  async loginCustomer(loginAdminDto: LoginCustomerDto, res: Response) {
    const { email, password } = loginAdminDto;
    const customer = await this.customerRepository.findOne({
      where: { email },
    });
    if (!customer) {
      throw new ForbiddenException("wrong email or password ");
    }
    const passwordMatches = await bcrypt.compare(password, customer.password);
    if (!passwordMatches)
      throw new ForbiddenException("wrong passwor or email");

    const tokens = await this.tokenService.getTokens(
      customer.id,
      customer.is_active,
      customer.email,
      "customer"
    );
    await this.tokenService.updateRefreshToken(
      customer.id,
      tokens.refresh_token,
      this.customerRepository
    );
    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return {
      message: `Welcome! ${customer.firstname}`,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }
  // ===================================== logout ====================================

  async logoutCustomer(id: number, res: Response) {
    const admin = await this.customerRepository.update(
      { refresh_token: null, is_active: false },
      { where: { id: +id } }
    );

    if (!admin) throw new ForbiddenException("Access Denied");
    res.clearCookie("refresh_token");
    return { message: "Admin logged out" };
  }
  async findAll() {
    let customers = await this.customerRepository.findAll({
      include: { all: true },
    });
    if (customers.length != 0) return customers;
    return "Empty table";
  }

  async findOne(id: number) {
    let customer = await this.customerRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!customer) return "not found by this id";
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    let find = await this.customerRepository.findOne({ where: { id } });
    if (!find) return "not found by this id";
    return await this.customerRepository.update(updateCustomerDto, {
      where: { id },
    });
  }

  async remove(id: number) {
    const customer = await this.customerRepository.destroy({ where: { id } });
    if (customer != 0) return "Deleted";
  }
}
