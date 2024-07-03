import { Booking } from "src/booking/entities/booking.entity";
import { Location } from "src/location/entities/location.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToOne, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity('properties')
export class Property {
    @PrimaryGeneratedColumn()
    id_property: number;

    @Column({ length: 150 })
    private title: string;

    @Column({ length: 300 })
    private description: string;

    @Column({ type: 'int', width: 2 })
    private rooms: number;

    @Column({ type: 'int', width: 10 })
    private price: number;

    @Column({ type: 'json', nullable: true })//la columna puede tener valores nulos
    private images: string[];

    @Column({ type: 'int2' })
    private rate: number;

    @Column({ length: 50 })
    private type: string;

    @Column({ length: 100 })
    private address: string;

    @Column({ length: 200 })
    private url_iframe: string;

    @Column({ nullable: true })
    private status: string;

    @Column({ nullable: true })
    private id_user : number;

    @Column({ nullable: true })
    private id_location : number;


    @ManyToOne(() => User, user => user.properties)
    @JoinColumn({ name: 'id_user', referencedColumnName: 'id_user' })
    user: User;
 
    @OneToMany(() => Booking, (booking) => booking.property)
    @JoinColumn({ name: 'id_property', referencedColumnName: 'id_property' })
    booking: Booking[];

    @ManyToOne(() => Location)
    @JoinColumn({ name: 'id_location', referencedColumnName: 'id_location' })
    location: Location; 

    constructor(
        title: string,
        description: string,
        rooms: number,
        price: number,
        images: string[],
        rate: number,
        type: string,
        address: string,
        url_iframe: string,
        status: string,
        id_user: number,
        id_location: number
    ) {
        this.title = title;
        this.description = description;
        this.rooms = rooms;
        this.price = price;
        this.images = images;
        this.rate = rate;
        this.type = type;
        this.address = address;
        this.url_iframe = url_iframe;
        this.status = status;
        this.id_user = id_user;
        this.id_location = id_location;
    }

    getId(): number { return this.id_property };

    getTitle(): string { return this.title };
    setTitle(title: string): void { this.title = title }

    getDescription(): string { return this.description };
    setDescription(description: string): void { this.description = description };

    getRooms(): number { return this.rooms };
    setRooms(rooms: number): void { this.rooms = rooms };

    getPrice(): number { return this.price };
    setPrice(price: number): void { this.price = price };

    getImages(): string[] { return this.images };
    setImages(images: string[]): void { this.images = images };

    getRate(): number { return this.rate };
    setRate(rate: number): void { this.rate = rate };

    getType(): string { return this.type };
    setType(type: string): void { this.type = type };

    getAddress(): string { return this.address };
    setAddress(address: string): void { this.address = address };

    getUrlIframe(): string { return this.url_iframe };
    setUrlIfrme(url_iframe: string): void { this.url_iframe = url_iframe };

    getStatus(): string { return this.status };
    setStatus( status: string) { this.status = status };

    getUserId(): number { return this.id_user };
    setUserId( id_user: number): void { this.id_user = id_user};

    getLocationId(): number { return this.id_location };
    setLocationId( id_location: number): void { this.id_location = id_location};
    
}
