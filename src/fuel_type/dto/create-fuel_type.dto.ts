import { ApiProperty } from "@nestjs/swagger";

export class CreateFuelTypeDto {
  @ApiProperty({ example: "Gas" })
  name: string;
}
