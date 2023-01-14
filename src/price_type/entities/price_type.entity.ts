import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("price_types")
export class PriceType {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: 300000 })
  @Column()
  price_per_day: number;
  @ApiProperty({ example: 15000 })
  @Column()
  price_per_hour: number;
  @ApiProperty({ example: 15000 })
  @Column()
  lateness_fee: number;
}
