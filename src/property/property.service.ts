import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PropertyDto } from './dto/create-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import {  FindOneOptions, QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class PropertyService {


  constructor(@InjectRepository(Property)
  private readonly propertyRepository: Repository<Property>) { }

  async getAll(): Promise<Property[]> {
    try {
      const properties: Property[] = await this.propertyRepository.find({
        relations: {
          user: true,
          booking: true,
          location: true
        }
      });
      return properties;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error al recuperar las propiedades',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPropertyById(id: number): Promise<Property> {
    try {
      const criterio: FindOneOptions = { relations: ['user', 'booking', 'location'], where: { id_property: id } };
      console.log(criterio);
      
      const property: Property = await this.propertyRepository.findOne(criterio);
      if (property) return property; 
      
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en la consulta a la base de datos'
        },
          HttpStatus.INTERNAL_SERVER_ERROR)
      };
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'No existe una propiedad con el idddddddd:' + id + error
      }, HttpStatus.NOT_FOUND)

    }
  }

  async createProperty( propertyDto: PropertyDto): Promise<Property> {
    console.log(propertyDto);
    try {
      console.log(propertyDto.images);
      
      const { title, description, rooms, price, images, rate, type, address, url_iframe, status, id_user, id_location } = propertyDto;
      const newProperty: Property = new Property(title, description, rooms, price, images, rate, type, address, url_iframe, status, id_user, id_location);
      newProperty.setTitle(title);
      newProperty.setDescription(description);
      newProperty.setRooms(Number(rooms));
      newProperty.setPrice(Number(price));
      newProperty.setImages(images);
      newProperty.setRate(rate);
      newProperty.setType(type);
      newProperty.setAddress(address); 
      newProperty.setUrlIfrme(url_iframe);
      newProperty.setStatus(status);
      newProperty.setUserId(id_user);
      newProperty.setLocationId(id_location);
      console.log(newProperty);
      
      return await this.propertyRepository.save(newProperty);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Error en el registro en la base de datos' + error,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'No se pudo crear el registro de la propiedad',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteProperty(id: number): Promise<any> {
    try {
      const result = await this.propertyRepository.delete(id);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en la consulta a la base de datos'
        }, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No existe una propiedad con el id:' + id,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateProperty(id: number, propertyDto: PropertyDto): Promise<Property> {
    try {
      const criterio: FindOneOptions = { where: { id_property: id } }
      let propertyToUpdate: Property = await this.propertyRepository.findOne(criterio);
      if (!propertyToUpdate) throw new HttpException('No existe ninguna propiedad con el ID proporcionado',
        HttpStatus.NOT_FOUND);
      propertyToUpdate.setTitle(propertyDto.title);
      propertyToUpdate.setDescription(propertyDto.description);
      propertyToUpdate.setRooms(propertyDto.rooms);
      propertyToUpdate.setPrice(propertyDto.price);
      propertyToUpdate.setImages(propertyDto.images);
      propertyToUpdate.setRate(propertyDto.rate);
      propertyToUpdate.setType(propertyDto.type);
      propertyToUpdate.setAddress(propertyDto.address);
      propertyToUpdate.setUrlIfrme(propertyDto.url_iframe);
      propertyToUpdate.setStatus(propertyDto.status);
      propertyToUpdate.setLocationId(propertyDto.id_location);
      return await this.propertyRepository.save(propertyToUpdate);
    } catch (error) {

      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en la consulta a la base de datos'
        },
          HttpStatus.INTERNAL_SERVER_ERROR)
      };

      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No existe una propiedad con el idddddddddddddddddddd:' + id + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}

