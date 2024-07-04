import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, HttpStatus, UseGuards, Patch } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyDto } from './dto/create-property.dto';
import { Property } from './entities/property.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) { }

  @Post()
  @UseGuards(AuthGuard)
  async createProperty(id_user: number,
    @Body() createPropertyDto: PropertyDto
  ): Promise<Property> {
    return this.propertyService.createProperty(createPropertyDto);
  }

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

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateProperty(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
    @Body() property: PropertyDto,
  ): Promise<Property> {
    return this.propertyService.updateProperty(id, property);
  }


  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteProperty(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: string
  ): Promise<void> {
    return this.propertyService.deleteProperty(+id);
  }
}
