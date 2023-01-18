import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PriceTypeService } from "./price_type.service";
import { CreatePriceTypeDto } from "./dto/create-price_type.dto";
import { UpdatePriceTypeDto } from "./dto/update-price_type.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PriceType } from "./entities/price_type.entity";

@ApiTags("PriceTypes")
@Controller("price-type")
export class PriceTypeController {
  constructor(private readonly priceTypeService: PriceTypeService) {}

  @ApiOperation({ summary: "PriceType malumotlarini kiritish" })
  @ApiResponse({ status: 200, type: PriceType })
  @Post()
  create(@Body() createPriceTypeDto: CreatePriceTypeDto) {
    return this.priceTypeService.create(createPriceTypeDto);
  }

  @ApiOperation({ summary: "Barcha PriceType ro'yxatini olish" })
  @ApiResponse({ status: 200, type: [PriceType] })
  @Get()
  findAll() {
    return this.priceTypeService.findAll();
  }

  @ApiOperation({ summary: "PriceType haqida malumot olish" })
  @ApiResponse({ status: 200, type: PriceType })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.priceTypeService.findOne(+id);
  }

  @ApiOperation({ summary: "PriceType ga o'zgartirish kiritish" })
  @ApiResponse({ status: 200, type: PriceType })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePriceTypeDto: UpdatePriceTypeDto
  ) {
    return this.priceTypeService.update(+id, updatePriceTypeDto);
  }

  @ApiOperation({ summary: "PriceType o'chirish" })
  @ApiResponse({ status: 200, type: PriceType })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.priceTypeService.remove(+id);
  }
}
