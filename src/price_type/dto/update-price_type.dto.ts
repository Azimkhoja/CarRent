import { PartialType } from '@nestjs/swagger';
import { CreatePriceTypeDto } from './create-price_type.dto';

export class UpdatePriceTypeDto extends PartialType(CreatePriceTypeDto) {}
