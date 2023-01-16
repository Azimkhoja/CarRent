import { Module } from "@nestjs/common";
import { PriceTypeService } from "./price_type.service";
import { PriceTypeController } from "./price_type.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { PriceType } from "./entities/price_type.entity";

@Module({
  imports: [SequelizeModule.forFeature([PriceType])],
  controllers: [PriceTypeController],
  providers: [PriceTypeService],
})
export class PriceTypeModule {}
