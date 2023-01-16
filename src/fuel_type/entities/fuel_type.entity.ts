import { ApiProperty } from "@nestjs/swagger";
import { Table, Column, DataType, Model } from "sequelize-typescript";

@Table({ tableName: "fuel_types", freezeTableName: true, timestamps: false })
export class FuelType extends Model<FuelType> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: "Gas" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
