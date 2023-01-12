import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("owners")
export class Owner {

    @PrimaryGeneratedColumn({
        type: "integer"
    })
    id: number
    @Column({
        type: "varchar",
        nullable: false
    })
    firstname: string
    @Column({
        type: "varchar"
    })
    lastname: string
    @Column({
        type: "varchar"
    })
    address: string
    @Column({
        type: "varchar",
        unique: true,
        nullable: false
    })
    contact_number: string
    @Column({
        type: "varchar",
        nullable: false
    })
    image_link: string
    @Column({
        type: "varchar",
        unique: true,
        nullable: false
    })
    username: string
    @Column({
        type: "boolean",
        default: false
    })
    is_active: boolean
    @Column({
        type: "integer"
    })
    admin_id: number










}
