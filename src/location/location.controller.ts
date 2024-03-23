import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';


@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

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

}
