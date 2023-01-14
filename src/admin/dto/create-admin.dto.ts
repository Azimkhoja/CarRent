import { ApiProperty } from "@nestjs/swagger";

export class CreateAdminDto {
  @ApiProperty({ example: "Doston" })
  firstname: string;
  @ApiProperty({ example: "Hamroyev" })
  lastname: string;
  @ApiProperty({ example: "994583636" })
  number: string;
  @ApiProperty({ example: "doston@gmail.com" })
  email: string;
  @ApiProperty({ example: "doston99" })
  password: string;
  @ApiProperty({ example: "Andijon" })
  address: string;
  @ApiProperty({ example: false })
  is_creator: boolean;
  @ApiProperty({ example: true || false })
  is_active: boolean;
}
