import { ApiProperty } from "@nestjs/swagger";

export class CreateCarImageDto {
  @ApiProperty({ example: "./images/cars/nexia.jpg" })
  image_link: string;
  @ApiProperty({ example: "nexia rasmi" })
  image_desc: string;
  @ApiProperty({ example: 2 })
  car_id: number;
}
