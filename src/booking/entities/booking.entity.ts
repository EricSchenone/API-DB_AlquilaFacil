import { Preference } from "mercadopago";
import { MercadoPago } from "src/mercado_pago/entities/mercado_pago.entity";
import { Property } from "src/property/entities/property.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('booking_calendar')
export class Booking {
    @PrimaryGeneratedColumn()
    private id_booking: number;

    @Column({ type: 'timestamp' })
    private date: Timestamp;

    @Column({ type: 'timestamp' })
    private date_init: Timestamp;

    @Column({ type: 'timestamp' })
    private date_finish: Timestamp;

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

    constructor(date: Timestamp, date_init: Timestamp, date_finish: Timestamp, id_property: number, status: boolean) {
        this.date = date;
        this.date_init = date_init;
        this.date_finish = date_finish;
        this.id_property = id_property;
        this.status = status;
    }

    getIdBooking(): number { return this.id_booking };

    getDate(): Timestamp { return this.date };
    setDate(date: Timestamp): void { this.date = date };

    getDateInit(): Timestamp { return this.date_init };
    setDateInit(dateInit: Timestamp): void { this.date_init = dateInit };

    getDateFinish(): Timestamp { return this.date_finish };
    setDateFinish(dateFinish: Timestamp): void { this.date_finish = dateFinish };

    getPropertyId(): number { return this. id_property};
    setPropertyId( id_property: number): void { this.id_property = id_property };

    getStatus(): boolean { return this.status };
    setStatus(status: boolean): void { this.status = status };

}

