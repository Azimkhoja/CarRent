import { ApiProperty } from "@nestjs/swagger";

export class CreateRentalDto {
  @ApiProperty({ example: "2022-01-02 14:20" })
  rental_datetime: Date;
  @ApiProperty({ example: "2022-01-12 10:50" })
  return_date: Date;
  @ApiProperty({ example: 1 })
  owner_id: number;
  @ApiProperty({ example: 3 })
  car_id: number;
  @ApiProperty({ example: 4 })
  customer_id: number;
  @ApiProperty({ example: 1 })
  rental_status: number;
}
