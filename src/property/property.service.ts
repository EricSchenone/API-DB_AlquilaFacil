import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PropertyDto } from './dto/create-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { FindOneOptions, QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class PropertyService {


  constructor(@InjectRepository(Property)
  private readonly propertyRepository: Repository<Property>) { }

  async getAll(): Promise<Property[]> {
    try {
      const properties: Property[] = await this.propertyRepository.find({ relations: ['users', 'booking_calendar', 'locations'] });
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
      const criterio: FindOneOptions = { relations: ['users', 'booking_calendar', 'locations' ], where: { id_property: id } };
      const property: Property = await this.propertyRepository.findOne(criterio);
      if (property) return property;
      throw new Error('No existe una propiedad con el id:' + id)
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la consulta a la base de datos'
        },
          HttpStatus.NOT_FOUND)
      };
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Error en la consulta de la propiedad'
      }, HttpStatus.BAD_REQUEST)

    }
  }

  async createProperty(propertyDto: PropertyDto): Promise<Property> {
    try {
      const { title, description, rooms, price, images, rate, type, address, url_iframe } = propertyDto;
      const newProperty: Property = new Property(title, description, rooms, price, images, rate, type, address, url_iframe);
      newProperty.setTitle(title);
      newProperty.setDescription(description);
      newProperty.setRooms(rooms);
      newProperty.setPrice(price);
      newProperty.setImages(images);
      newProperty.setRate(rate);
      newProperty.setType(type);
      newProperty.setAddress(address);
      newProperty.setUrlIfrme(url_iframe);

      return await this.propertyRepository.save(newProperty);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Error en el registro en la base de datos',
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
      if (result.affected === 0) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'No existe ninguna propiedad con el ID proporcionado',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error al eliminar la propiedad',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
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
      return await this.propertyRepository.save(propertyToUpdate);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en la actualizacion de la rerserva en la base de datos'
        },
          HttpStatus.INTERNAL_SERVER_ERROR)
      };
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error al actualizar la propiedad',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}

