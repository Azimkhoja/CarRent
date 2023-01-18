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
import { Customer } from "src/customer/entities/customer.entity";

@Table({ tableName: "comments", freezeTableName: true, timestamps: false })
export class Comment extends Model<Comment> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: "menga yoqdi yaxshi moshina ekan." })
  @Column({
    type: DataType.STRING,
  })
  comment: string;
  @ApiProperty({ example: 3 })
  @Column({
    type: DataType.INTEGER,
  })
  comment_rating: number;
  @ApiProperty({ example: "2022-01-13" })
  @Column({
    type: DataType.DATE,
  })
  date: Date;
  @ApiProperty({ example: 2 })
  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
  })
  customer_id: number;
  @ApiProperty({ example: 3 })
  @ForeignKey(() => Car)
  @Column({
    type: DataType.INTEGER,
  })
  car_id: number;

  @BelongsTo(() => Customer)
  customer: Customer[];

  @BelongsTo(() => Car)
  car: Car[];
}
