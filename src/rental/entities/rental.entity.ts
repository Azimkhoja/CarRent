import { ApiProperty } from "@nestjs/swagger";
import { Table, Column, DataType, Model } from "sequelize-typescript";

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
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
  })
  owner_id: number;
  @ApiProperty({ example: 4 })
  @Column({
    type: DataType.INTEGER,
  })
  car_id: number;
  @ApiProperty({ example: 3 })
  @Column({
    type: DataType.INTEGER,
  })
  customer_id: number;
  @ApiProperty({ example: 2 })
  @Column({
    type: DataType.INTEGER,
  })
  rental_status: number;
}
