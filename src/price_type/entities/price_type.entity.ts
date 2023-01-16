import { ApiProperty } from "@nestjs/swagger";
import { Table, Column, DataType, Model } from "sequelize-typescript";

@Table({ tableName: "price_types", freezeTableName: true, timestamps: false })
export class PriceType extends Model<PriceType> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 300000 })
  @Column({
    type: DataType.INTEGER,
  })
  price_per_day: number;
  @ApiProperty({ example: 15000 })
  @Column({
    type: DataType.INTEGER,
  })
  price_per_hour: number;
  @ApiProperty({ example: 15000 })
  @Column({
    type: DataType.INTEGER,
  })
  lateness_fee: number;
}
