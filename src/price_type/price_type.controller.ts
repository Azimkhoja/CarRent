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
import { ApiTags } from "@nestjs/swagger";

@ApiTags("PriceTypes")
@Controller("price-type")
export class PriceTypeController {
  constructor(private readonly priceTypeService: PriceTypeService) {}

  @Post()
  create(@Body() createPriceTypeDto: CreatePriceTypeDto) {
    return this.priceTypeService.create(createPriceTypeDto);
  }

  @Get()
  findAll() {
    return this.priceTypeService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.priceTypeService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePriceTypeDto: UpdatePriceTypeDto
  ) {
    return this.priceTypeService.update(+id, updatePriceTypeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.priceTypeService.remove(+id);
  }
}
