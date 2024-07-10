
import { MercadoPago } from "src/mercado_pago/entities/mercado_pago.entity";
import { Property } from "src/property/entities/property.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('booking_calendar')
export class Booking {
    @PrimaryGeneratedColumn()
    private id_booking: number;

    @Column()
    private date: number;

    @Column()
    private date_init: number;

    @Column()
    private date_finish: number;

    @Column()
    id_property: number;

    @Column({ nullable: true })
    id_user: number;

    @Column()
    private status: boolean;

    @Column({ nullable: true })
    id_preference: string;

    @ManyToOne(() => User, (user) => user.bookings)
    @JoinColumn({ name: 'id_user' })
    user: User;

    @ManyToOne(() => Property, (property) => property.booking)
    @JoinColumn({ name: 'id_property', referencedColumnName: 'id_property' })
    property: Property;

    @OneToOne(() => MercadoPago, mercadoPago => mercadoPago.booking)
    @JoinColumn({ name: 'id_preference', referencedColumnName: 'id_preference' })
    mercadoPago: MercadoPago;
    
   


    constructor(date: number, date_init: number, date_finish: number, id_property: number, id_user: number, status: boolean, id_preference: string) {
        this.date = date;
        this.date_init = date_init;
        this.date_finish = date_finish;
        this.id_property = id_property;
        this.id_user = id_user;
        this.status = status;
        this.id_preference = id_preference;
    }

    getIdBooking(): number { return this.id_booking };

    getDate(): number { return this.date };
    setDate(date: number): void { this.date = date };

    getDateInit(): number { return this.date_init };
    setDateInit(dateInit: number): void { this.date_init = dateInit };

    getDateFinish(): number { return this.date_finish };
    setDateFinish(dateFinish: number): void { this.date_finish = dateFinish };

    getPropertyId(): number { return this.id_property };
    setPropertyId(id_property: number): void { this.id_property = id_property };

    getIdUser(): number { return this.id_user };
    setIdUser(id_user: number) { this.id_user = id_user };

    getStatus(): boolean { return this.status };
    setStatus(status: boolean): void { this.status = status };

    getPreferenceId(): string { return this.id_preference };
    setPreferenceId(id_preference: string): void { this.id_preference = id_preference }

}

