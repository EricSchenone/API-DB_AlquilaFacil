import { Property } from "src/property/entities/property.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    private id_user: number;

    @Column({ length: 50})
    private name: string;

    @Column({ length: 50})
    private lastname: string;

    @Column({ length: 50 })
    private email: string;

    @Column({ type: 'int', width:14})
    private phone: number;

    @Column( { length: 50 })
    private password: string;

    @Column({ length: 50 })
    private username: string;
    properties: any;

    @OneToMany(() => Property, 
        property => property.user)

    @JoinColumn()
    property : Property [];

    constructor(name: string, lastname: string, email: string, phone: number, password: string, username: string) {
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.username = username;
    }

    public getIdUser(): number {return this.id_user;}
    
    public getName(): string {return this.name;}
    public setName(name: string): void {this.name = name;}

    public getLastname(): string {return this.lastname;}
    public setLastname(lastname: string): void {this.lastname = lastname;}

    public getEmail(): string {return this.email;}
    public setEmail(email: string): void {this.email = email;}

    public getPhone(): number {return this.phone;}
    public setPhone(phone: number): void {this.phone = phone;}

    public getPassword(): string {return this.password;}
    public setPassword(password: string): void {this.password = password;}

    public getUsername(): string {return this.username;}
    public setUsername(username: string): void {this.username = username;}
}
