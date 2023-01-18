import { ApiProperty } from "@nestjs/swagger";
import {
  Model,
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Admin } from "src/admin/entities/admin.entity";

@Table({ tableName: "customers", freezeTableName: true, timestamps: false })
export class Customer extends Model<Customer> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Anvarbek" })
  @Column({
    type: DataType.STRING,
  })
  firstname: string;
  @ApiProperty({ example: "Tojiddinov" })
  @Column({
    type: DataType.STRING,
  })
  lastname: string;
  @ApiProperty({ example: "Parkent" })
  @Column({
    type: DataType.STRING,
  })
  address: string;
  @ApiProperty({ example: "AG4586321" })
  @Column({
    unique: true,
    allowNull: false,
  })
  passport: string;

  @ApiProperty({ example: "986642121" })
  @Column({
    unique: true,
  })
  contact_number: string;

  @ApiProperty({ example: "4582122352" })
  @Column({
    unique: true,
  })
  dr_license: string;
  @ApiProperty({ example: "./images/customers/rasm.jpg" })
  @Column({
    type: DataType.STRING,
  })
  image_link: string;
  @ApiProperty({ example: "anvar" })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;
  @ApiProperty({ example: "mykey334" })
  @Column({
    type: DataType.STRING,
  })
  password: string;
  @ApiProperty({ example: false })
  @Column({
    type: DataType.BOOLEAN,
  })
  is_active: boolean;
  @ApiProperty({ example: 3 })
  @ForeignKey(() => Admin)
  @Column({
    type: DataType.INTEGER,
  })
  admin_id: number;
  @Column({
    type: DataType.STRING,
  })
  refresh_token: string;

  @BelongsTo(() => Admin)
  admin: Admin;
}
