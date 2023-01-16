import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "src/admin/entities/admin.entity";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { LoginAdminDto } from "./dto/login.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import * as bcrypt from "bcryptjs";


@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminRepository: typeof Admin) {}
  async create(createAdminDto: CreateAdminDto) {
    return await this.adminRepository.create(createAdminDto);
  }
  async registrate (loginAdminDto: LoginAdminDto) {
    const { email, password } = loginAdminDto;
    const admin = await this.adminRepository.findOne({
      where: { email },
    });
    if (!admin) {
      throw new ForbiddenException("wrong email or password ");
    }
    const passwordMatches = await bcrypt.compare(
      password,
      admin.password
    );
    if (!passwordMatches)
      throw new ForbiddenException("wrong passwor or email");

    const tokens = await this.getTokens(admin.id, admin.login);
    await this.updateRefreshToken(admin.id, tokens.refresh_token);
    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return {
      message: "Admin creted",
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }

  async findAll() {
    let admins = await this.adminRepository.findAll({ include: { all: true } });
    if (admins.length != 0) return admins;
    return "Empty table";
  }

  async findOne(id: number) {
    let admin = await this.adminRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!admin) return "not found by this id";
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    let find = await this.adminRepository.findOne({ where: { id } });
    if (!find) return "not found by this id";
    return await this.adminRepository.update(updateAdminDto, { where: { id } });
  }

  async remove(id: number) {
    return this.adminRepository.destroy({ where: { id } });
  }
}
