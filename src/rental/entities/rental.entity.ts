import { ApiProperty } from "@nestjs/swagger";
import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Car } from "src/car/entities/car.entity";
import { Customer } from "src/customer/entities/customer.entity";

@Table({ tableName: "rentals", freezeTableName: true, timestamps: false })
export class Rental extends Model<Rental> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: "2022-01-07 15:30" })
  @Column({
    type: DataType.INTEGER,
  })
  rental_datetime: Date;
  @ApiProperty({ example: "2022-01-14 10:20" })
  @Column({
    type: DataType.DATE,
  })
  return_date: Date;
  // @ApiProperty({ example: 1 })
  // @Column({
  //   type: DataType.INTEGER,
  // })
  // owner_id: number;
  @ApiProperty({ example: 4 })
  @ForeignKey(() => Car)
  @Column({
    type: DataType.INTEGER,
  })
  car_id: number;
  @ApiProperty({ example: 3 })
  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
  })
  customer_id: number;
  @BelongsTo(() => Car)
  car: Car;
  @BelongsTo(() => Customer)
  customer: Customer;
}
