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
import { CarImageService } from "./car_image.service";
import { CreateCarImageDto } from "./dto/create-car_image.dto";
import { UpdateCarImageDto } from "./dto/update-car_image.dto";
import { CarImage } from "./entities/car_image.entity";

@ApiTags("CarImages")
@Controller("car-image")
export class CarImageController {
  constructor(private readonly carImageService: CarImageService) {}

  @ApiOperation({ summary: "CarImage malumotlarini kiritish" })
  @ApiResponse({ status: 200, type: CarImage })
  @Post()
  create(@Body() createCarImageDto: CreateCarImageDto) {
    return this.carImageService.create(createCarImageDto);
  }

  @ApiOperation({ summary: "Barcha CarImage ro'yxatini olish" })
  @ApiResponse({ status: 200, type: [CarImage] })
  @Get()
  findAll() {
    return this.carImageService.findAll();
  }

  @ApiOperation({ summary: "CarImage haqida malumot olish" })
  @ApiResponse({ status: 200, type: CarImage })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.carImageService.findOne(+id);
  }

  @ApiOperation({ summary: "CarImage ga o'zgartirish kiritish" })
  @ApiResponse({ status: 200, type: CarImage })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCarImageDto: UpdateCarImageDto
  ) {
    return this.carImageService.update(+id, updateCarImageDto);
  }

  @ApiOperation({ summary: "CarImage o'chirish" })
  @ApiResponse({ status: 200, type: CarImage })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.carImageService.remove(+id);
  }
}
