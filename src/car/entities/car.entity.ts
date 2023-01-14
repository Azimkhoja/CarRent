import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("cars")
export class Car {
  @ApiProperty({ example: 2 })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: "Chevrolet" })
  @Column()
  brand: string;
  @ApiProperty({ example: "Malibu " })
  @Column()
  model: string;
  @ApiProperty({ example: "2020" })
  @Column()
  year: string;
  @ApiProperty({ example: "Red" })
  @Column()
  color: string;
  @ApiProperty({ example: 5 })
  @Column()
  capacity: number;
  @ApiProperty({ example: 1 })
  @Column()
  fuel_type_id: number;
  @ApiProperty({ example: 5 })
  @Column()
  rating: number;
  @ApiProperty({ example: 1 })
  @Column()
  owner_id: number;
  @ApiProperty({ example: true })
  @Column()
  is_automate: boolean;
  @ApiProperty({ example: 4 })
  @Column()
  price_type_id: number;
}
