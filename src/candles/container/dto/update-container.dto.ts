import { PartialType } from '@nestjs/mapped-types';
import { CreateContainerDto } from './create-container.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateContainerDto{

    @IsOptional()
    @IsString({message: 'El nombre es necesario' })
    readonly name?: string;

    @IsOptional()
    @IsString({message: 'La imagen es necesaria' })
    readonly image_url?: string;

}
