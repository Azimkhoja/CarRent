import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("fuel_types")
export class FuelType {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: "Gas" })
  @Column()
  name: string;
}
