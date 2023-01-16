import { ApiProperty } from "@nestjs/swagger";
import { Table, Column, DataType, Model } from "sequelize-typescript";

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
  @ApiProperty({ example: '998954482525' })
  @Column({
    type: DataType.STRING,
  })
  contact_number: string;
  @ApiProperty({ example: "./images/owners/image.jpg" })
  @Column({
    type: DataType.STRING,
  })
  image_link: string;
  @ApiProperty({ example: "Joma" })
  @Column({
    type: DataType.STRING,
    unique: true
  })
  username: string;
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
  @Column({
    type: DataType.INTEGER,
  })
  admin_id: number;
  @Column({
    type: DataType.STRING,
  })
  refresh_token: string  
}
