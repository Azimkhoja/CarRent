import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./entities/admin.entity";
import { Response } from "express";
import { LoginAdminDto } from "./dto/login.dto";
import { CreatorAdminGuard } from "src/guards/creator-admin.guard";


@ApiTags("Admins")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post('add')
  @UseGuards(CreatorAdminGuard)
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }
  @ApiOperation({ summary: "Admin registrate" })
  @ApiResponse({ status: 201, type: Admin })
  @Post("registrate")
  registrate(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response
    ) {
      return this.adminService.registrate(createAdminDto, res);
    }

  @ApiOperation({ summary: "login Admin" })
  @ApiResponse({ status: 200, type: Admin })
  @Post("login")
  login(@Body() loginDto: LoginAdminDto, @Res({ passthrough: true }) res: Response) {
    return this.adminService.login(loginDto, res);
    }   
    
  @ApiOperation({ summary: "Barcha Adminslar ro'yxatini olish" })
  @ApiResponse({ status: 200, type: [Admin] })
  @Get()
  @UseGuards(CreatorAdminGuard)
  findAll() {
    return this.adminService.findAll();
  }
  @ApiOperation({ summary: "Admin logout" })
  @ApiResponse({ status: 200, type: Admin })
  @Post('logout/:id')
  logout(@Param("id") id: string, @Res({ passthrough: true }) res: Response) {
    return this.adminService.logout(+id, res);
  }
  @ApiOperation({ summary: "bitta Admin haqida malumot olish" })
  @ApiResponse({ status: 200, type: Admin })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }
  @ApiOperation({ summary: "Admin ga o'zgartirish kiritish" })
  @ApiResponse({ status: 200, type: Admin })
  @Patch(":id")
  @UseGuards(CreatorAdminGuard)
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }
  
  @ApiOperation({ summary: "Adminni o'chirish" })
  @ApiResponse({ status: 200, type: Admin })
  @Delete(":id")
  @UseGuards(CreatorAdminGuard)
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
}

