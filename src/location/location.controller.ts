import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus, Put } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationDto } from './dto/create-location.dto';
import { Location } from './entities/location.entity';


@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async locationBooking(@Body() location : LocationDto): Promise<Location> {
    return this.locationService.createLocation(location)
  }

  @Get()
  async getAll(): Promise<Location[]> {
    return this.locationService.getAll();
  }

  @Get(':id')
  async getLocationById(@Param(('id'),new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
  })) id: string): Promise<Location> {
    return this.locationService.getLocationById(+id);
  }
  
  @Put(':id')
  async updateLocation(@Param(('id'), new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
  })) id: number, @Body() location: LocationDto) : Promise<Location> {
    return this.locationService.updateLocation(id, location)
  }

  @Delete(':id')
  async deleteLocation(@Param(('id'), new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
  })) id: number): Promise<any> {
    return this.locationService.deleteLocation(id);
  }

}
