import { IsString, Length } from "class-validator";

export class CreateContainerDto {

    @IsString({message: 'El nombre es necesario' })
    readonly name: string;

    @IsString({message: 'La imagen es necesaria' })
    @Length(1, 255, { message: 'La imagen es necesaria' })
    readonly image_url: string;
}
