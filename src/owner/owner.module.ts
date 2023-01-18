import { Module } from "@nestjs/common";
import { OwnerService } from "./owner.service";
import { OwnerController } from "./owner.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Owner } from "src/owner/entities/owner.entity";
import { TokenModule } from "src/token/token.module";

@Module({
  imports: [SequelizeModule.forFeature([Owner]), TokenModule],
  controllers: [OwnerController],
  providers: [OwnerService],
})
export class OwnerModule {}
