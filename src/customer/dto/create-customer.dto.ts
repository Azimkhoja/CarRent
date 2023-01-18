import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomerDto {
  @ApiProperty({ example: "Komil" })
  firstname: string;
  @ApiProperty({ example: "Abdullayev" })
  lastname: string;
  @ApiProperty({ example: "Namangan" })
  address: string;
  @ApiProperty({ example: "Ag7854632" })
  passport: string;
  @ApiProperty({ example: "995001414" })
  contact_number: string;
  @ApiProperty({ example: "4587930002" })
  dr_license: string;
  @ApiProperty({ example: "./images/customers/komil.jpg" })
  image_link: string;
  @ApiProperty({ example: "komiljon" })
  email;
  @ApiProperty({ example: "kom3727" })
  password: string;
  @ApiProperty({ example: false })
  is_active_account: boolean;
  @ApiProperty({ example: 2 })
  admin_id: number;
}
