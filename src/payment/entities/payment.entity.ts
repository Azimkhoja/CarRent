import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("payments")
export class Payment {
  
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: 2 })
  @Column()
  rental_id: number;
  @ApiProperty({ example: 2 })
  @Column()
  payment_method: number;
  @ApiProperty({ example: 2 })
  @Column()
  lateness_fee: number;
  @ApiProperty({ example: "2022-01-24" })
  @Column()
  payment_date: Date;
  @ApiProperty({ example: 2 })
  @Column()
  admin_id: number;
}
