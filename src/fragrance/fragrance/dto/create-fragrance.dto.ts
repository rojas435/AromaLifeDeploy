import { IsString } from "class-validator";

export class CreateFragranceDto {

    @IsString({message: 'El nombre es necesario' })
    readonly name: string;

}
