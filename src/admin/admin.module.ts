import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Admin } from "./entities/admin.entity";
import { TokenModule } from "src/token/token.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [SequelizeModule.forFeature([Admin]), TokenModule, JwtModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
