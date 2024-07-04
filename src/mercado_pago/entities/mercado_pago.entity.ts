import { Booking } from "src/booking/entities/booking.entity";
import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('preferences_mp')
export class MercadoPago {
    @PrimaryColumn()
     id_preference: string;
    
    @Column({ nullable: true })
    private title: string;

    @Column({ nullable: true })
    private quantity: number;

    @Column({ nullable: true })
    private unit_price: number;

    @OneToOne(() => Booking, booking => booking.id_preference)
    booking: Booking;

    constructor(title: string, quantity: number, unit_price: number) {
        this.title = title;
        this.quantity = quantity;
        this.unit_price = unit_price;

    } 

}
