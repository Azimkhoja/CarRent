import { ApiProperty } from "@nestjs/swagger";
import { Table, Column, DataType, Model } from "sequelize-typescript";

@Table({ tableName: "car_images", freezeTableName: true, timestamps: false })
export class CarImage extends Model<CarImage> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: "./images/cars/nexia.jpg" })
  @Column({
    type: DataType.STRING,
  })
  image_link: string;
  @ApiProperty({ example: "nexia rasm" })
  @Column({
    type: DataType.STRING,
  })
  image_desc: string;
  @ApiProperty({ example: 3 })
  @Column({
    type: DataType.INTEGER,
  })
  car_id: number;
}
