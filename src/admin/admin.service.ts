import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "src/admin/entities/admin.entity";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { LoginAdminDto } from "./dto/login.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import * as bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { TokenService } from "src/token/token.service";
import { where } from "sequelize";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepository: typeof Admin,
    private tokenService: TokenService
  ) {}

  // ===================================== create admin ====================================

  async create(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminRepository.findOne({
      where: { email: createAdminDto.email },
    });
    if (candidate) {
      throw new HttpException(
        "This email is already exists",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashedPAssword = await bcrypt.hash(createAdminDto.password, 7);
    const admin = await this.adminRepository.create({
      ...createAdminDto,
      password: hashedPAssword,
    });
    return [admin.email, createAdminDto.password];
  }

  // ===================================== registrate admin ====================================

  async registrate(adminDto: CreateAdminDto, res: Response) {
    const candidate = await this.adminRepository.findOne({
      where: { email: adminDto.email },
    });
    if (candidate) {
      throw new HttpException(
        "This email is already exists",
        HttpStatus.BAD_REQUEST
      );
    }

    const hashedPAssword = await bcrypt.hash(adminDto.password, 7);
    const admin = await this.adminRepository.create({
      ...adminDto,
      password: hashedPAssword,
    });
    admin.is_active = true;
    admin.save();
    const tokens = await this.tokenService.getTokens(
      admin.id,
      admin.is_creator,
      admin.email,
      "admin"
    );
    await this.tokenService.updateRefreshToken(
      admin.id,
      tokens.refresh_token,
      this.adminRepository
    );
    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return {
      ...adminDto,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }

  // ===================================== login admin ====================================

  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const { email, password } = loginAdminDto;
    const admin = await this.adminRepository.findOne({
      where: { email },
    });
    if (!admin) {
      throw new ForbiddenException("wrong email or password ");
    }
    const passwordMatches = await bcrypt.compare(password, admin.password);
    if (!passwordMatches)
      throw new ForbiddenException("wrong passwor or email");

    const tokens = await this.tokenService.getTokens(
      admin.id,
      admin.is_creator,
      admin.email,
      "admin"
    );
    await this.tokenService.updateRefreshToken(
      admin.id,
      tokens.refresh_token,
      this.adminRepository
    );
    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return {
      message: `Welcome! ${admin.firstname}`,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }
  // ===================================== findall ====================================

  async findAll() {
    let admins = await this.adminRepository.findAll({ include: { all: true } });
    if (admins.length != 0) return admins;
    return "Empty table";
  }
  // ===================================== findOne ====================================
  
  async findOne(id: number) {
    let admin = await this.adminRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!admin) return "not found by this id";
    return admin;
  }
  // ===================================== update ====================================

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    let find = await this.adminRepository.findOne({ where: { id } });
    if (!find) return "not found by this id";
    return await this.adminRepository.update(updateAdminDto, { where: { id } });
  }
  // ===================================== remove ====================================

  async remove(id: number) {
    const res = await this.adminRepository.destroy({ where: { id } });
    if (res != 0) return "Deleted";
  }

  // ===================================== logout ====================================

  async logout(id: number, res: Response) {
    const admin = await this.adminRepository.update(
      { refresh_token: null, is_active: false },
      { where: { id: +id } }
    );

    if (!admin) throw new ForbiddenException("Access Denied");
    res.clearCookie("refresh_token");
    return { message: "Admin logged out" };
  }
}
