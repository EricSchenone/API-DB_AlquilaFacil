import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, HttpStatus, UseGuards } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyDto } from './dto/create-property.dto';
import { Property } from './entities/property.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) { }


  @Get(':id')
  @UseGuards(AuthGuard)
  async getPropertyById(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: string
  ): Promise<Property> {
    return this.propertyService.getPropertyById(+id);
  }

  @Get()
  async getAllByCriteria(): Promise<Property[]> {
    return this.propertyService.getAll()
  }

  @Post()
  @UseGuards(AuthGuard)
  async createProperty( id_user: number,
    @Body() createPropertyDto: PropertyDto
  ): Promise<Property> {
    return this.propertyService.createProperty(createPropertyDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteProperty(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: string
  ): Promise<void> {
    return this.propertyService.deleteProperty(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateProperty(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
    @Body() property: PropertyDto,
  ): Promise<Property> {
    console.log(id, property);
    
    return this.propertyService.updateProperty(id, property);
  }
}
