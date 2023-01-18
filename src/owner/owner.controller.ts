import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from "@nestjs/common";
import { OwnerService } from "./owner.service";
import { CreateOwnerDto } from "./dto/create-owner.dto";
import { UpdateOwnerDto } from "./dto/update-owner.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Owner } from "./entities/owner.entity";
import { LoginOwnerDto } from "./dto/login-owner.dto";
import { Response } from "express";

@ApiTags("Owners")
@Controller("owner")
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @ApiOperation({ summary: "Owner malumotlarini kiritish" })
  @ApiResponse({ status: 200, type: Owner })
  @Post()
  create(@Body() createOwnerDto: CreateOwnerDto) {
    return this.ownerService.create(createOwnerDto);
  }
  @ApiOperation({ summary: "Owner Registration" })
  @ApiResponse({ status: 201, type: Owner })
  @Post("registrate")
  registrate(
    @Body() createCustomerDto: CreateOwnerDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.ownerService.registrate(createCustomerDto, res);
  }
  @ApiOperation({ summary: "Owner login" })
  @ApiResponse({ status: 200, type: Owner })
  @Post("login")
  loginCustomer(
    @Body() loginDto: LoginOwnerDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.ownerService.loginOwner(loginDto, res);
  }
  @ApiOperation({ summary: "Barcha Owner ro'yxatini olish" })
  @ApiResponse({ status: 200, type: [Owner] })
  @Get()
  findAll() {
    return this.ownerService.findAll();
  }

  @ApiOperation({ summary: "Owner haqida malumot olish" })
  @ApiResponse({ status: 200, type: Owner })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ownerService.findOne(+id);
  }

  @ApiOperation({ summary: "Owner ga o'zgartirish kiritish" })
  @ApiResponse({ status: 200, type: Owner })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    return this.ownerService.update(+id, updateOwnerDto);
  }
  @ApiOperation({ summary: "Owner logout" })
  @ApiResponse({ status: 200, type: Owner })
  @Post("logout/:id")
  logout(@Param("id") id: string, @Res({ passthrough: true }) res: Response) {
    return this.ownerService.logoutCustomer(+id, res);
  }
  @ApiOperation({ summary: "Owner o'chirish" })
  @ApiResponse({ status: 200, type: Owner })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.ownerService.remove(+id);
  }
}
