import { Module } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerController } from "./customer.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Customer } from "./entities/customer.entity";
import { TokenModule } from "src/token/token.module";

@Module({
  imports: [SequelizeModule.forFeature([Customer]), TokenModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
