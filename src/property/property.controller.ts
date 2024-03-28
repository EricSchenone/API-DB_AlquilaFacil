import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyDto } from './dto/create-property.dto';
import { Property } from './entities/property.entity';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  async getAll(): Promise<Property[]> {
    return this.propertyService.getAll();
  }

  @Get(':id')
  async getPropertyById(@Param('id', new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
  })) id: string): Promise<Property> {
    return this.propertyService.getPropertyById(+id);
  }

  @Post()
  async createProperty(@Body() createPropertyDto: PropertyDto): Promise<Property> {
    return this.propertyService.createProperty(createPropertyDto);
  }

  @Delete(':id')
  async deleteProperty(@Param('id', new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
  })) id: string): Promise<void> {
    return this.propertyService.deleteProperty(+id);
  }

  @Put(':id')
  async updateProperty(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })) id: number,
    @Body() property: PropertyDto,
  ): Promise<Property> {
    return this.propertyService.updateProperty(id, property);
  }
}
