import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("customers")
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Anvarbek" })
  @Column()
  firstname: string;
  @ApiProperty({ example: "Tojiddinov" })
  @Column()
  lastname: string;
  @ApiProperty({ example: "Parkent" })
  @Column()
  address: string;
  @ApiProperty({ example: "986642121" })
  @Column({
    unique: true,
  })
  contact_number: string;
  @ApiProperty({ example: "./images/customers/rasm.jpg" })
  @Column()
  image_link: string;
  @ApiProperty({ example: "anvar" })
  @Column({
    unique: true,
  })
  username: string;
  @ApiProperty({ example: "mykey334" })
  @Column()
  password: string;
  @ApiProperty({ example: false })
  @Column({
    type: "boolean",
    default: false,
  })
  is_active_account: boolean;
  @ApiProperty({ example: 3 })
  @Column()
  admin_id: number;
}
