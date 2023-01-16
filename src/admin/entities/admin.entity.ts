import { ApiProperty } from "@nestjs/swagger";
import { Table, Column, DataType, Model } from "sequelize-typescript";

@Table({ tableName: "admins", freezeTableName: true, timestamps: false })
export class Admin extends Model<Admin> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: "Habib" })
  @Column({
    type: DataType.STRING,
  })
  firstname: string;
  @ApiProperty({ example: "Magamedov" })
  @Column({
    type: DataType.STRING,
  })
  lastname: string;
  @ApiProperty({ example: "990014552" })
  @Column({
    type: DataType.STRING,
  })
  number: string;
  @ApiProperty({ example: "habibjan@gmail.com" })
  @Column({
    type: DataType.STRING,
  })
  email: string;
  @ApiProperty({ example: "habb98990" })
  @Column({
    type: DataType.STRING,
  })
  password: string;
  @ApiProperty({ example: "russia Dagistan " })
  @Column({
    type: DataType.STRING,
  })
  address: string;
  @ApiProperty({ example: false })
  @Column({
    type: DataType.BOOLEAN,
  })
  is_creator: boolean;
  @ApiProperty({ example: false })
  @Column({
    type: DataType.BOOLEAN,
  })
  is_active: boolean;
  @Column({
    type: DataType.STRING,
  })
  refresh_token: string;
}
