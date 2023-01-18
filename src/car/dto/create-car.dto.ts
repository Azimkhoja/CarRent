import { ApiProperty } from "@nestjs/swagger";

export class CreateCarDto {
  @ApiProperty({ example: "Bentley" })
  brand: string;
  @ApiProperty({ example: "GSL" })
  model: string;
  @ApiProperty({ example: "2015" })
  year: string;
  @ApiProperty({ example: "White" })
  color: string;
  @ApiProperty({ example: 5 })
  capacity: number;
  @ApiProperty({ example: 1 })
  fuel_type_id: number;
  @ApiProperty({ example: 4 })
  rating: number;
  @ApiProperty({ example: 2 })
  owner_id: number;
  @ApiProperty({ example: true })
  is_automate: boolean;
  @ApiProperty({ example: false })
  is_busy: boolean;
  @ApiProperty({ example: 3 })
  price_type_id: number;
}
