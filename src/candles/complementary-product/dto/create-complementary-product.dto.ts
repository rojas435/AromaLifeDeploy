import { IsString, IsOptional, IsNumber, IsUrl, IsInt, Min } from 'class-validator';

export class CreateComplementaryProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  image_url?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsInt()
  @Min(1, { message: 'La cantidad debe ser al menos 1' })
  quantity: number;
}