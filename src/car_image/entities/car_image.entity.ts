import { ApiProperty } from "@nestjs/swagger";
import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Car } from "src/car/entities/car.entity";

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
  @ForeignKey(() => Car)
  @Column({
    type: DataType.INTEGER,
  })
  car_id: number;

  @BelongsTo(() => Car)
  car: Car[];
}
