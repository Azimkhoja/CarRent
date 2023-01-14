import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("admins")
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: "Habib" })
  @Column()
  firstname: string;
  @ApiProperty({ example: "Magamedov" })
  @Column()
  lastname: string;
  @ApiProperty({ example: "990014552" })
  @Column()
  number: string;
  @ApiProperty({ example: "habibjan@gmail.com" })
  @Column()
  email: string;
  @ApiProperty({ example: "habb98990" })
  @Column()
  password: string;
  @ApiProperty({ example: "russia Dagistan " })
  @Column()
  address: string;
  @ApiProperty({ example: false })
  @Column()
  is_creator: boolean;
  @ApiProperty({ example: false })
  @Column()
  is_active: boolean;
}
