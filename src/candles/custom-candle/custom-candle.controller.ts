import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomCandleService } from './custom-candle.service';
import { CreateCustomCandleDto } from './dto/create-custom-candle.dto';
import { UpdateCustomCandleDto } from './dto/update-custom-candle.dto';

@Controller('custom-candle')
export class CustomCandleController {
  constructor(private readonly customCandleService: CustomCandleService) {}

  @Post()
  create(@Body() createCustomCandleDto: CreateCustomCandleDto) {
    return this.customCandleService.create(createCustomCandleDto);
  }

  @Get()
  findAll() {
    return this.customCandleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customCandleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomCandleDto: UpdateCustomCandleDto) {
    return this.customCandleService.update(id, updateCustomCandleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customCandleService.remove(id);
  }
}