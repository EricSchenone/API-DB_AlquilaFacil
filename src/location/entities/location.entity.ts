import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('locations')
export class Location {
    @PrimaryGeneratedColumn()
    private id_location: number;

    @Column({ length: 50 })
    private country: string;

    @Column({ length: 50 })
    private state: string;
    
    @Column({ length: 50 })
    private city: string
    

    constructor(country: string, state: string, city: string) {
        this.country = country;
        this.state = state;
        this.city = city;
    }

    getIdLocation(): number { return this.id_location }

    getCountry(): string { return this.country }
    setCountry( country: string ): void { this.country = country }

    getState(): string { return this.state }
    setState( state: string ): void { this.state = state }

    getCity(): string { return this.city }
    setCity( city: string ): void { this.city = city }

}
