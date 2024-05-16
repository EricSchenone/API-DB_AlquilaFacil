import { Preference } from "mercadopago";
import { MercadoPago } from "src/mercado_pago/entities/mercado_pago.entity";
import { Property } from "src/property/entities/property.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('booking_calendar')
export class Booking {
    @PrimaryGeneratedColumn()
    private id_booking: number;

    @Column('datetime')
    private date: Date;

    @Column()
    private date_init: Date;

    @Column()
    private date_finish: Date;

    @Column()
    id_property: number;

    @Column()
    private status: boolean;

    @Column()
    id_preference: number;

    @ManyToOne(() => Property, (property) => property.id_booking)
    @JoinColumn({ name: 'id_property', referencedColumnName: 'id_property' })
    property: Property;

    @OneToOne(() => MercadoPago)
    @JoinColumn({ name: 'id_preference', referencedColumnName: 'id_preference'})
    preference: Preference;

    constructor(date: Date, date_init: Date, date_finish: Date, id_property: number, status: boolean) {
        this.date = date;
        this.date_init = date_init;
        this.date_finish = date_finish;
        this.id_property = id_property;
        this.status = status;
    }

    getIdBooking(): number { return this.id_booking };

    getDate(): Date { return this.date };
    setDate(date: Date): void { this.date = date };

    getDateInit(): Date { return this.date_init };
    setDateInit(dateInit: Date): void { this.date_init = dateInit };

    getDateFinish(): Date { return this.date_finish };
    setDateFinish(dateFinish: Date): void { this.date_finish = dateFinish };

    getPropertyId(): number { return this. id_property};
    setPropertyId( id_property: number): void { this.id_property = id_property };

    getStatus(): boolean { return this.status };
    setStatus(status: boolean): void { this.status = status };

}

