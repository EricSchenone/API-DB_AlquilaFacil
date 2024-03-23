import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { FindOneOptions, QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class LocationService {

  constructor(@InjectRepository(Location)
  private readonly locationRepository: Repository<Location>) { }


  async getAll(): Promise<Location[]> {
    const allLocations: Location[] = await this.locationRepository.find()
    return allLocations;
  }

  async getLocationById(id: number): Promise<Location> {
    try {
      const criteria: FindOneOptions = { where: { id_location: id } };
      const location: Location = await this.locationRepository.findOne(criteria)
      if (location) return location;
      throw new Error('No existe una localidad con el id:' + id)
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en la consulta a la base de datos'
        },
          HttpStatus.INTERNAL_SERVER_ERROR)
      };
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Error en la consulta de la localidad'
      }, HttpStatus.BAD_REQUEST)
    }

  }
}
