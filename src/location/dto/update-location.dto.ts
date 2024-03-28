import { PartialType } from '@nestjs/mapped-types';
import { LocationDto } from './create-location.dto';

export class UpdateLocationDto extends PartialType(LocationDto) {}
