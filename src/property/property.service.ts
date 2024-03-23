import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { FindOneOptions, QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class PropertyService {
  
  constructor(@InjectRepository(Property)
  private readonly proeprtyRepository: Repository<Property>) {}

  async getAll(): Promise<Property[]> {
    const properties: Property[] = await this.proeprtyRepository.find();
    return properties;
  }

   async getPropertyById( id: number ): Promise<Property> {
    try {
      const criteria: FindOneOptions = { where: { id_property : id }};
      const property: Property = await this.proeprtyRepository.findOne(criteria);
      if(property) return property;
      throw new Error('No existe una propiedad con el id:' + id)
    } catch(error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en la consulta a la base de datos'
        },
          HttpStatus.INTERNAL_SERVER_ERROR)
      };
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Error en la consulta de la propiedad'
      }, HttpStatus.BAD_REQUEST)

    }
  
    
  }

}
