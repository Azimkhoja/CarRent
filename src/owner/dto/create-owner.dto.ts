import { ApiProperty } from "@nestjs/swagger";

export class CreateOwnerDto {
  @ApiProperty({ example: "Jamol" })
  firstname: string;
  @ApiProperty({ example: "Karimov" })
  lastname: string;
  @ApiProperty({ example: "Chilonzor tumani" })
  address: string;
  @ApiProperty({ example: "912225747" })
  contact_number: string;
  @ApiProperty({ example: "'./rasmlar/user/image.jpg" })
  image_link: string;
  @ApiProperty({ example: "jamooliy@gmail.com" })
  email: string;
  @ApiProperty({ example: 775452 })
  password: string;
  @ApiProperty({ example: true })
  is_active: boolean;
  @ApiProperty({ example: 2 })
  admin_id: number;
}
