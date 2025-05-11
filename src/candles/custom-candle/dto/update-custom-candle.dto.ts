import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomCandleDto } from './create-custom-candle.dto';

export class UpdateCustomCandleDto extends PartialType(CreateCustomCandleDto) {}