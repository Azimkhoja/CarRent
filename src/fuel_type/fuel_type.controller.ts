import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { FuelTypeService } from "./fuel_type.service";
import { CreateFuelTypeDto } from "./dto/create-fuel_type.dto";
import { UpdateFuelTypeDto } from "./dto/update-fuel_type.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FuelType } from "./entities/fuel_type.entity";

@ApiTags("FuelTypes")
@Controller("fuel-type")
export class FuelTypeController {
  constructor(private readonly fuelTypeService: FuelTypeService) {}

  @ApiOperation({ summary: "FuelType malumotlarini kiritish" })
  @ApiResponse({ status: 200, type: FuelType })
  @Post()
  create(@Body() createFuelTypeDto: CreateFuelTypeDto) {
    return this.fuelTypeService.create(createFuelTypeDto);
  }

  @ApiOperation({ summary: "Barcha FuelType ro'yxatini olish" })
  @ApiResponse({ status: 200, type: [FuelType] })
  @Get()
  findAll() {
    return this.fuelTypeService.findAll();
  }

  @ApiOperation({ summary: "FuelType haqida malumot olish" })
  @ApiResponse({ status: 200, type: FuelType })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.fuelTypeService.findOne(+id);
  }

  @ApiOperation({ summary: "FuelType ga o'zgartirish kiritish" })
  @ApiResponse({ status: 200, type: FuelType })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateFuelTypeDto: UpdateFuelTypeDto
  ) {
    return this.fuelTypeService.update(+id, updateFuelTypeDto);
  }

  @ApiOperation({ summary: "FuelType o'chirish" })
  @ApiResponse({ status: 200, type: FuelType })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.fuelTypeService.remove(+id);
  }
}
