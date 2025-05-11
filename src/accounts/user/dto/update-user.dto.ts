import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {

  @ApiProperty({ example: 'Juan Perez', description: 'Nombre del usuario' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'JuanP@example.com', description: 'Correo del usuario' })
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ example: 'admin, supervisor', description: 'Rol con el cual va tener acceso a ciertas rutas' })
  @IsOptional()
  @IsString()
  role?: string;

  
}