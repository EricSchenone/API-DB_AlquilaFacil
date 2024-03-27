import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import {  LocationDto } from './dto/create-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { FindOneOptions, QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class LocationService {

  constructor(@InjectRepository(Location)
  private readonly locationRepository: Repository<Location>) { }

  async createLocation(locationDto: LocationDto): Promise<Location> {
    try {
      const newLocation: Location = new Location(locationDto.country, locationDto.state, locationDto.city);
      newLocation.setCountry(locationDto.country);
      newLocation.setState(locationDto.state);
      newLocation.setCity(locationDto.city);
      const savedlocation: Location = await this.locationRepository.create(newLocation);
      if (savedlocation.getIdLocation()) return newLocation;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en el registro en la base de datos'
        }, HttpStatus.INTERNAL_SERVER_ERROR)
      };
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'No se pudo crear el registro de la localidad'
      }, HttpStatus.BAD_REQUEST)
    };
  }



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

  async updateLocation(id: number, locationDto: LocationDto): Promise<Location> {
    try {
      const criteria: FindOneOptions = { where: { id_location: id } };
      let updateLocation: Location = await this.locationRepository.findOne(criteria);
      if (!location) throw new NotFoundException('No se encuentra una localiad con el id:' + id);
      updateLocation.setCountry(locationDto.country);
      updateLocation.setState(locationDto.state);
      updateLocation.setCity(locationDto.city);
      updateLocation = await this.locationRepository.save(updateLocation)
      return updateLocation;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en la actualizacion de la localidad en la base de datos'
        },
          HttpStatus.INTERNAL_SERVER_ERROR)
      };
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Error en la actualizacion de la localidad'
      },
        HttpStatus.BAD_REQUEST)

    }

  }

  async deleteLocation( id: number): Promise<any> {
    try {
      const criteria: FindOneOptions = { where: { id_location: id } };
      const location: Location = await this.locationRepository.findOne(criteria);
      if (!location) throw new NotFoundException('No existe una escuela con el id:' + id)
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en la consulta al base de datos'
        }, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'No existe un registro con el  id.' + id
      }, HttpStatus.NOT_FOUND)
    }

  }
}



