import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomerDto {
  @ApiProperty({ example: "Komil" })
  firstname: string;
  @ApiProperty({ example: "Abdullayev" })
  lastname: string;
  @ApiProperty({ example: "Namangan" })
  address: string;
  @ApiProperty({ example: "995001414" })
  contact_number: string;
  @ApiProperty({ example: "./images/customers/komil.jpg" })
  image_link: string;
  @ApiProperty({ example: "komiljon" })
  username;
  @ApiProperty({ example: "kom3727" })
  password: string;
  @ApiProperty({ example: false })
  is_active_account: boolean;
  @ApiProperty({ example: 2 })
  admin_id: number;
}
