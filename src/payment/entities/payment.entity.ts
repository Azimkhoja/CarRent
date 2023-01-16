import { ApiProperty } from "@nestjs/swagger";
import { Table, Column, DataType, Model } from "sequelize-typescript";
@Table({ tableName: "payments", freezeTableName: true, timestamps: false })
export class Payment extends Model<Payment> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 2 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rental_id: number;
  @ApiProperty({ example: 2 })
  @Column({
    type: DataType.INTEGER,
  })
  payment_method: number;
  
  @ApiProperty({ example: "2022-01-24" })
  @Column({
    type: DataType.DATE,
    defaultValue: Date.now(),
  })
  payment_date: Date;
  @ApiProperty({ example: 2 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  admin_id: number;
}
