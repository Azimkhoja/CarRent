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
import { ApiTags } from "@nestjs/swagger";

@ApiTags("FuelTypes")
@Controller("fuel-type")
export class FuelTypeController {
  constructor(private readonly fuelTypeService: FuelTypeService) {}

  @Post()
  create(@Body() createFuelTypeDto: CreateFuelTypeDto) {
    return this.fuelTypeService.create(createFuelTypeDto);
  }

  @Get()
  findAll() {
    return this.fuelTypeService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.fuelTypeService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateFuelTypeDto: UpdateFuelTypeDto
  ) {
    return this.fuelTypeService.update(+id, updateFuelTypeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.fuelTypeService.remove(+id);
  }
}
