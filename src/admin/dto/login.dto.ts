import { ApiProperty } from "@nestjs/swagger";

export class LoginAdminDto {
  @ApiProperty({ example: "email@gmail.com" })
  email: string;
  @ApiProperty({ example: "sonaa44" })
  password: string;
}
