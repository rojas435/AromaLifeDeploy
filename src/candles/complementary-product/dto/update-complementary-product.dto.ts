import { PartialType } from '@nestjs/mapped-types';
import { CreateComplementaryProductDto } from './create-complementary-product.dto';

export class UpdateComplementaryProductDto extends PartialType(CreateComplementaryProductDto) {}