import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Exclude} from "class-transformer";
import { v4 as uuid } from "uuid";   //v4 numeros aleatorios.

@Entity("users")
class User {

    @PrimaryColumn()  //chave primaria
    readonly id: string;  //seja só leitura

    @Column()
    name: string;

    @Column()
    email: string;
    
    @Column()
    admin: boolean;

    @Exclude()    //deixando de sair a senha no get
    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

  
    constructor() {
        if(!this.id) {  // se for difente o id, criar um valor uuid
            this.id = uuid();
        }
    }

}

export { User};


