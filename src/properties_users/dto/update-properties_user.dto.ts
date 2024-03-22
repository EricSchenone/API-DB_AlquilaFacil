import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertiesUserDto } from './create-properties_user.dto';

export class UpdatePropertiesUserDto extends PartialType(CreatePropertiesUserDto) {}
