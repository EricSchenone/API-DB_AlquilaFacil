import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyModule } from './property/property.module';
import { UserModule } from './user/user.module';
import { LocationModule } from './location/location.module';
import { BookingModule } from './booking/booking.module';
import { AuthModule } from './auth/auth.module';
import { MercadoPagoModule } from './mercado_pago/mercado_pago.module';


@Module({
  imports: [
    TypeOrmModule.forRoot( {
      type: 'cockroachdb',
      host:'alquila-facil-2244.g8x.gcp-southamerica-east1.cockroachlabs.cloud',
      port: 26257,
      ssl: true,
      database: 'alquila_facil',
      username: 'alquila_facil',
      password: '0qStCcTCeTyuhvUIvPNOKQ',
      entities: [
        'dist/**/**.entity{.ts,.js}' 
      ],
      synchronize: true 
    }), 
    PropertyModule,
    UserModule,
    LocationModule,
    BookingModule,
    AuthModule,
    MercadoPagoModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
