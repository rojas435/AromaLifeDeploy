// src/accounts/user/user.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { searchUserDto } from './dto/search-user.dto'; 
import { Roles } from '../../guards/roles.decorator'; 
import { RolesGuard } from '../../guards/roles.guard'; 
import { Public } from '../../decorators/public.decorator'; 
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
@UseGuards(RolesGuard)
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  @Public() 
  gettAllUsers(@Query() params: searchUserDto) {
    return this.userService.getAll();
  }

  @Get(':id')
  @Public() 
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findById(id);
  }

  @Post()
  @Public()
  create(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }

  @Patch(':id')
  @Roles('admin') // Solo usuarios con rol 'admin' pueden acceder
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUser: UpdateUserDto) {
    console.log('ID del usuario:', id);
    console.log('Datos para actualizar:', updateUser);
    return this.userService.update(id, updateUser);
  }

  @Delete(':id')
  @Roles('admin') // Solo usuarios con rol 'admin' pueden acceder
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id);
  }
}