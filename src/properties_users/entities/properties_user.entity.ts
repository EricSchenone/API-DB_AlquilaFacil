import {  PrimaryColumn } from "typeorm";

export class PropertiesUser {
    @PrimaryColumn()
    private id_properties: number;
    @PrimaryColumn()
    private id_users: number;

    constructor (id_properties : number, id_users : number) {
        this.id_properties = id_properties;
        this.id_users = id_users;
    }

    public getId_properties(): number { return this.id_properties; }
   
    public getId_users(): number { return this.id_users; }
   
}