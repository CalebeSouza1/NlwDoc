import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn 
} from "typeorm";

import{v4 as uuid} from "uuid"


@Entity("Tags")
class Tag {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id) { //senão tiver id
            this.id = uuid(); //preenche com uuid
        }
    }

}

export { Tag }