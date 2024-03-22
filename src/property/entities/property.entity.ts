import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('properties')
export class Property {
    @PrimaryGeneratedColumn()
    private id_property: number
    @Column({ length: 150})
    private title: string;
    @Column({ length: 300})
    private description: string;
    @Column({ type: 'int', width:2 })
    private rooms : number;
    @Column({ type: 'int', width:10 })
    private price: number;
    @Column({ type: 'simple-array', nullable: true })
    private images: string[];
    @Column({  type: 'tinyint'})
    private rate: number;
    @Column({ length: 50})
    private type: string;
    @Column({ length: 200})
    private url_iframe: string;

}
