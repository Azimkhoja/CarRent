import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CarService } from "./car.service";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { Car } from "./entities/car.entity";

@ApiTags("Cars")
@Controller("car")
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiOperation({ summary: "Car malumotlarini kiritish" })
  @ApiResponse({ status: 200, type: Car })
  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @ApiOperation({ summary: "Barcha Car ro'yxatini olish" })
  @ApiResponse({ status: 200, type: [Car] })
  @Get()
  findAll() {
    return this.carService.findAll();
  }

  @ApiOperation({ summary: "Car haqida malumot olish" })
  @ApiResponse({ status: 200, type: Car })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.carService.findOne(+id);
  }

  @ApiOperation({ summary: "Car ga o'zgartirish kiritish" })
  @ApiResponse({ status: 200, type: Car })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @ApiOperation({ summary: "Carni o'chirish" })
  @ApiResponse({ status: 200, type: Car })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.carService.remove(+id);
  }
}
