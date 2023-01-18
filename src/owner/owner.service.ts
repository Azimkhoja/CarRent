import { ForbiddenException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Owner } from "src/owner/entities/owner.entity";
import { CreateOwnerDto } from "./dto/create-owner.dto";
import { UpdateOwnerDto } from "./dto/update-owner.dto";
import * as bcrypt from 'bcryptjs'
import { LoginOwnerDto } from "./dto/login-owner.dto";
import { TokenService } from "src/token/token.service";
import { Response } from "express";
@Injectable()
export class OwnerService {
  constructor(@InjectModel(Owner) private ownerRepository: typeof Owner, private tokenService: TokenService) {}
  async create(createOwnerDto: CreateOwnerDto) {
    return await this.ownerRepository.create(createOwnerDto);
  }
  async registrate(createCustomerDto: CreateOwnerDto, res: Response) {
    const is_owner = await this.ownerRepository.findOne({
      where: { email: createCustomerDto.email },
    });
    if (is_owner) {
      throw new HttpException(
        "this email is already exists",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashedPassword = await bcrypt.hash(createCustomerDto.password, 7);
    const owner = await this.ownerRepository.create({
      ...createCustomerDto,
      password: hashedPassword,
    });
    owner.is_active = true;
    owner.save();
    const tokens = await this.tokenService.getTokens(
      owner.id,
      owner.is_active,
      owner.email,
      "owner"
    );
    const newCustomer = await this.tokenService.updateRefreshToken(
      owner.id,
      tokens.refresh_token,
      this.ownerRepository
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
  async loginOwner(loginOwnerDto: LoginOwnerDto, res: Response) {
    const { email, password } = loginOwnerDto;
    const owner = await this.ownerRepository.findOne({
      where: { email },
    });
    if (!owner) {
      throw new ForbiddenException("wrong email or password ");
    }
    const passwordMatches = await bcrypt.compare(password, owner.password);
    if (!passwordMatches)
      throw new ForbiddenException("wrong passwor or email");

    const tokens = await this.tokenService.getTokens(
      owner.id,
      owner.is_active,
      owner.email,
      "owner"
    );
    await this.tokenService.updateRefreshToken(
      owner.id,
      tokens.refresh_token,
      this.ownerRepository
    );
    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return {
      message: `Welcome! ${owner.firstname}`,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }
  async findAll() {
    let owners = await this.ownerRepository.findAll({ include: { all: true } });
    if (owners.length != 0) return owners;
    return "Empty table";
  }

  async findOne(id: number) {
    let owner = await this.ownerRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!owner) return "not found by this id";
    return owner;
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
    let find = await this.ownerRepository.findOne({ where: { id } });
    if (!find) return "not found by this id";
    return await this.ownerRepository.update(updateOwnerDto, { where: { id } });
  }
  async logoutCustomer(id: number, res: Response) {
    const admin = await this.ownerRepository.update(
      { refresh_token: null, is_active: false },
      { where: { id: +id } }
    );

    if (!admin) throw new ForbiddenException("Access Denied");
    res.clearCookie("refresh_token");
    return { message: "Admin logged out" };
  }
  async remove(id: number) {
    const owner = await this.ownerRepository.destroy({ where: { id } });
    if (owner != 0) return "Deleted";
  }
}
