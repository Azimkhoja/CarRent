import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { OwnerModule } from "./owner/owner.module";
import { CarModule } from "./car/car.module";
import { PaymentModule } from "./payment/payment.module";
import { RentalModule } from "./rental/rental.module";
import { CustomerModule } from "./customer/customer.module";
import { AdminModule } from "./admin/admin.module";
import { PriceTypeModule } from "./price_type/price_type.module";
import { CommentsModule } from "./comments/comments.module";
import { CarImageModule } from "./car_image/car_image.module";
import { FuelTypeModule } from "./fuel_type/fuel_type.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [__dirname + "dist/**/*.entity{.ts, .js}"],
      autoLoadModels: true,
      logging: false,
    }),
    OwnerModule,
    CarModule,
    PaymentModule,
    RentalModule,
    CustomerModule,
    AdminModule,
    PriceTypeModule,
    CommentsModule,
    CarImageModule,
    FuelTypeModule,
    TokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
