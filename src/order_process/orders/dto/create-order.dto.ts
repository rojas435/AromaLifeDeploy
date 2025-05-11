import { IsUUID, IsNumber, IsOptional, IsString, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from '../../order-item/dto/create-order-item.dto';

export class CreateOrderDto {
  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El total debe ser un número válido con hasta 2 decimales' })
  @Min(0, { message: 'El total no puede ser negativo' })
  totalAmount: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  shippingAddress?: string;

  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}