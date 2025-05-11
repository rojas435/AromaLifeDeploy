import { PartialType } from '@nestjs/mapped-types';
import { CreateFragranceDto } from './create-fragrance.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateFragranceDto extends PartialType(CreateFragranceDto) {

    @IsOptional()
    @IsString({message: 'El nombre es necesario' })
    readonly name?: string;
}
