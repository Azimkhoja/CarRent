import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "src/admin/entities/admin.entity";
import { Repository } from "typeorm";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    return this.adminRepository.save(createAdminDto);
  }

  async findAll() {
    let admins = await this.adminRepository.find();
    if (admins.length != 0) return admins;
    return "Empty table";
  }

  async findOne(id: number) {
    let admin = await this.adminRepository.findOneBy({ id });
    if (!admin) return "not found by this id";
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    let find = await this.adminRepository.findOneBy({ id });
    if (!find) return "not found by this id";
    return await this.adminRepository.update({ id }, updateAdminDto);
  }

  async remove(id: number) {
    return this.adminRepository.delete({ id });
  }
}
