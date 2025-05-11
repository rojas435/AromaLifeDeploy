import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomCandleComplementaryProductService } from './custom-candle_complementary-product.service';
import { CreateCustomCandleComplementaryProductDto } from './dto/create-custom-candle_complementary-product.dto';
import { UpdateCustomCandleComplementaryProductDto } from './dto/update-custom-candle_complementary-product.dto';

@Controller('custom-candle-complementary-product')
export class CustomCandleComplementaryProductController {
  constructor(private readonly service: CustomCandleComplementaryProductService) {}

  @Post()
  create(@Body() createDto: CreateCustomCandleComplementaryProductDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDto: UpdateCustomCandleComplementaryProductDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}