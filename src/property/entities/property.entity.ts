import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('properties')
export class Property {
    @PrimaryGeneratedColumn()
    private id_property: number;

    @Column({ length: 150 })
    private title: string;

    @Column({ length: 300 })
    private description: string;

    @Column({ type: 'int', width: 2 })
    private rooms: number;

    @Column({ type: 'int', width: 10 })
    private price: number;

    @Column({ type: 'simple-array', nullable: true })
    private images: string[];

    @Column({ type: 'tinyint' })
    private rate: number;

    @Column({ length: 50 })
    private type: string;

    @Column({ length: 100 })
    private address: string;

    @Column({ length: 200 })
    private url_iframe: string;

    constructor(
        title: string,
        description: string,
        rooms: number,
        price: number,
        images: string[],
        rate: number,
        type: string,
        address: string,
        url_iframe: string) {
            this.title = title;
            this.description = description;
            this.rooms = rooms;
            this.price = price;
            this.images = images;
            this.rate = rate;
            this.type = type;
            this.address = address;
            this.url_iframe = url_iframe;
    }

    getId(): number { return this.id_property };

    getDescription(): string { return this.address };
    setDescription( description : string): void { this.description = description };

    getRooms(): number { return this.rooms };
    setRooms( rooms: number ): void { this.rooms = rooms };
    
    getPrice(): number { return this.price };
    setPrice( price: number): void { this.price = price };

    getImages(): string[] { return this.images };
    setImages( images: string[]): void { this.images = images };

    getRate(): number { return this,this.rate };
    setRate( rate: number): void { this.rate = rate };

    getType(): string { return this.type };
    setType( type: string): void { this.type = type };

    getAddress(): string { return this.address };
    setAddress( address: string ): void { this.address = address };

    getUrlIframe(): string { return this.url_iframe };
    setUrlIfrme( url_iframe: string): void { this.url_iframe = url_iframe };



}
