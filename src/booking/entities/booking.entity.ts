import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    private status: boolean;  

    constructor( date : Date, date_init: Date, date_finish: Date, status: boolean) {
        this.date = date;
        this.date_init = date_init;
        this.date_finish = date_finish;
        this.status = status;
    }

    getIdBooking(): number { return this.id_booking }

    getDate(): Date { return this.date }
    setDate( date : Date): void { this.date = date }

    getDateInit(): Date { return this.date_init }
    setDateInit( dateInit : Date): void { this.date_init = dateInit }

    getDateFinish(): Date { return this.date_finish }
    setDateFinish( dateFinish: Date): void { this.date_finish = dateFinish }

    getStatus(): boolean { return this.status }
    setStatus( status : boolean ): void { this.status = status }
}

