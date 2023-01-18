import { ApiProperty } from "@nestjs/swagger";
import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { FuelType } from "src/fuel_type/entities/fuel_type.entity";
import { Owner } from "src/owner/entities/owner.entity";
import { PriceType } from "src/price_type/entities/price_type.entity";

@Table({ tableName: "cars", freezeTableName: true, timestamps: false })
export class Car extends Model<Car> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: "Chevrolet" })
  @Column({
    type: DataType.STRING,
  })
  brand: string;
  @ApiProperty({ example: "Malibu " })
  @Column({
    type: DataType.STRING,
  })
  model: string;
  @ApiProperty({ example: "2020" })
  @Column({
    type: DataType.STRING,
  })
  year: string;
  @ApiProperty({ example: "Red" })
  @Column({
    type: DataType.STRING,
  })
  color: string;
  @ApiProperty({ example: 5 })
  @Column({
    type: DataType.INTEGER,
  })
  capacity: number;
  @ApiProperty({ example: 1 })
  @ForeignKey(() => FuelType)
  @Column({
    type: DataType.INTEGER,
  })
  fuel_type_id: number;
  @ApiProperty({ example: 5 })
  @Column({
    type: DataType.INTEGER,
  })
  rating: number;
  @ApiProperty({ example: 1 })
  @ForeignKey(() => Owner)
  @Column({
    type: DataType.INTEGER,
  })
  owner_id: number;
  @ApiProperty({ example: true })
  @Column({
    type: DataType.BOOLEAN,
  })
  is_automate: boolean;

  @ApiProperty({ example: true })
  @Column({
    type: DataType.BOOLEAN,
  })
  is_busy: boolean;

  @ApiProperty({ example: 4 })
  @ForeignKey(() => PriceType)
  @Column({
    type: DataType.INTEGER,
  })
  price_type_id: number;

  @BelongsTo(() => Owner)
  owner: Owner;
  @BelongsTo(() => PriceType)
  price_type: PriceType;
  @BelongsTo(() => FuelType)
  fuel_type: FuelType;
}
