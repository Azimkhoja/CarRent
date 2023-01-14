import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @ApiProperty({ example: 3 })
  rental_id: number;
  @ApiProperty({ example: 3 })
  payment_method: number;
  @ApiProperty({ example: 450000 })
  lateness_fee: number;
  @ApiProperty({ example: "2022-01-24" })
  payment_date: Date;
  @ApiProperty({ example: 1 })
  admin_id: number;
}
