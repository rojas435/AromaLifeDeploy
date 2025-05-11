import { IsUUID, IsNumber } from 'class-validator';

export class CreateCustomCandleComplementaryProductDto {
  @IsUUID()
  customCandleId: string; // UUID para CustomCandle

  @IsNumber()
  complementaryProductId: number; // Integer para ComplementaryProduct
}