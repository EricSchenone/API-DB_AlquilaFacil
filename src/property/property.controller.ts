import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}


  @Get()
  async getAll(): Promise<Property[]>{
    return this.propertyService.getAll();
  }

  @Get(':id')
  async getpropertyById(@Param(('id'), new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
  })) id: string): Promise<Property> {
    return this.propertyService.getPropertyById(+id);
  }

}
