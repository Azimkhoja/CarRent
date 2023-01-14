import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
  @ApiProperty({ example: "yaxshi moshina ekan menga yoqdi" })
  comment: string;
  @ApiProperty({ example: 4 })
  comment_rating: number;
  @ApiProperty({ example: "2022-01-15" })
  date: Date;
  @ApiProperty({ example: 2 })
  customer_id: number;
  @ApiProperty({ example: 3 })
  car_id: number;
}
