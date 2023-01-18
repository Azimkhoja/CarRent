import { ApiProperty } from "@nestjs/swagger";

export class LoginOwnerDto {
  @ApiProperty({ example: "owner@gmail.com" })
  email: string;
  @ApiProperty({ example: "sonata44" })
  password: string;
}
