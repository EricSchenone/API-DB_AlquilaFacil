import { PartialType } from '@nestjs/mapped-types';
import { PropertyDto } from './create-property.dto';

export class UpdatePropertyDto extends PartialType(PropertyDto) {}
