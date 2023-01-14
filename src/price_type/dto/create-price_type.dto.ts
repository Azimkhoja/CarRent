import { ApiProperty } from "@nestjs/swagger";

export class CreatePriceTypeDto {
  @ApiProperty({ example: 300000 })
  price_per_day: number;
  @ApiProperty({ example: 15000 })
  price_per_hour: number;
  @ApiProperty({ example: 15000 })
  lateness_fee: number;
}
