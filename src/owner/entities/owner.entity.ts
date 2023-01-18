import { ApiProperty } from "@nestjs/swagger";
import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Admin } from "src/admin/entities/admin.entity";

@Table({ tableName: "owners", freezeTableName: true, timestamps: false })
export class Owner extends Model<Owner> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: "Jamol" })
  @Column({
    type: DataType.STRING,
  })
  firstname: string;
  @ApiProperty({ example: "Hakimov" })
  @Column({
    type: DataType.STRING,
  })
  lastname: string;
  @ApiProperty({ example: "olmazor tumani" })
  @Column({
    type: DataType.STRING,
  })
  address: string;
  @ApiProperty({ example: "998954482525" })
  @Column({
    type: DataType.STRING,
  })
  contact_number: string;
  @ApiProperty({ example: "./images/owners/image.jpg" })
  @Column({
    type: DataType.STRING,
  })
  image_link: string;
  @ApiProperty({ example: "jamol@gmail.com" })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;
  @ApiProperty({ example: "pass123" })
  @Column({
    type: DataType.STRING,
  })
  password: string;
  @ApiProperty({ example: true })
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
