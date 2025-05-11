import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomCandleComplementaryProductDto } from './create-custom-candle_complementary-product.dto';

export class UpdateCustomCandleComplementaryProductDto extends PartialType(CreateCustomCandleComplementaryProductDto) {}