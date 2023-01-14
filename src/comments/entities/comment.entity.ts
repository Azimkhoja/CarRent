import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: "menga yoqdi yaxshi moshina ekan." })
  @Column()
  comment: string;
  @ApiProperty({ example: 3 })
  @Column()
  comment_rating: number;
  @ApiProperty({ example: "2022-01-13" })
  @Column()
  date: Date;
  @ApiProperty({ example: 2 })
  @Column()
  customer_id: number;
  @ApiProperty({ example: 3 })
  @Column()
  car_id: number;
}
