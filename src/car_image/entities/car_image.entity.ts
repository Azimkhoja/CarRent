import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("car_images")
export class CarImage {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: "./images/cars/nexia.jpg" })
  @Column()
  image_link: string;
  @ApiProperty({ example: "nexia rasm" })
  @Column()
  image_desc: string;
  @ApiProperty({ example: 3 })
  @Column()
  car_id: number;
}
