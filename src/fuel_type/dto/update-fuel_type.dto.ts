import { PartialType } from '@nestjs/swagger';
import { CreateFuelTypeDto } from './create-fuel_type.dto';

export class UpdateFuelTypeDto extends PartialType(CreateFuelTypeDto) {}
