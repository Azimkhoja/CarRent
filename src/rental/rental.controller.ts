import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { RentalService } from "./rental.service";
import { CreateRentalDto } from "./dto/create-rental.dto";
import { UpdateRentalDto } from "./dto/update-rental.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AdminCustomerGuard } from "src/guards/admin-customer.guard";
import { Rental } from "./entities/rental.entity";

@ApiTags("Rentals")
@Controller("rental")
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @ApiOperation({ summary: "Rental malumotlarini kiritish" })
  @ApiResponse({ status: 200, type: Rental })
  @Post()
  @UseGuards(AdminCustomerGuard)
  create(@Body() createRentalDto: CreateRentalDto) {
    return this.rentalService.create(createRentalDto);
  }

  @ApiOperation({ summary: "Barcha Rental ro'yxatini olish" })
  @ApiResponse({ status: 200, type: [Rental] })
  @Get()
  findAll() {
    return this.rentalService.findAll();
  }

  @ApiOperation({ summary: "Rental haqida malumot olish" })
  @ApiResponse({ status: 200, type: Rental })
  @Get(":id")
  @UseGuards(AdminCustomerGuard)
  findOne(@Param("id") id: string) {
    return this.rentalService.findOne(+id);
  }

  @ApiOperation({ summary: "Rental ga o'zgartirish kiritish" })
  @ApiResponse({ status: 200, type: Rental })
  @Patch(":id")
  @UseGuards(AdminCustomerGuard)
  update(@Param("id") id: string, @Body() updateRentalDto: UpdateRentalDto) {
    return this.rentalService.update(+id, updateRentalDto);
  }

  @ApiOperation({ summary: "Rental o'chirish" })
  @ApiResponse({ status: 200, type: Rental })
  @Delete(":id")
  @UseGuards(AdminCustomerGuard)
  remove(@Param("id") id: string) {
    return this.rentalService.remove(+id);
  }
}
