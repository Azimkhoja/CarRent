import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rentals")
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: "2022-01-07 15:30" })
  @Column()
  rental_datetime: Date;
  @ApiProperty({ example: "2022-01-14 10:20" })
  @Column()
  return_date: Date;
  @ApiProperty({ example: 1 })
  @Column()
  owner_id: number;
  @ApiProperty({ example: 4 })
  @Column()
  car_id: number;
  @ApiProperty({ example: 3 })
  @Column()
  customer_id: number;
  @ApiProperty({ example: 2 })
  @Column()
  rental_status: number;
}
