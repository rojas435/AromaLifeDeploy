import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComplementaryProductService } from './complementary-product.service';
import { CreateComplementaryProductDto } from './dto/create-complementary-product.dto';
import { UpdateComplementaryProductDto } from './dto/update-complementary-product.dto';

@Controller('complementary-product')
export class ComplementaryProductController {
  constructor(private readonly complementaryProductService: ComplementaryProductService) {}

  @Post()
  create(@Body() createComplementaryProductDto: CreateComplementaryProductDto) {
    return this.complementaryProductService.create(createComplementaryProductDto);
  }

  @Get()
  findAll() {
    return this.complementaryProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.complementaryProductService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateComplementaryProductDto: UpdateComplementaryProductDto) {
    return this.complementaryProductService.update(id, updateComplementaryProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.complementaryProductService.remove(id);
  }
}