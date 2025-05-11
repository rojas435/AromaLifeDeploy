import { PartialType } from '@nestjs/mapped-types';
import { CreateEmotionalStateFragranceDto } from './create-emotional-state_fragrance.dto';

export class UpdateEmotionalStateFragranceDto extends PartialType(CreateEmotionalStateFragranceDto) {}
