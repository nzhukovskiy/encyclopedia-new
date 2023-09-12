import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {History} from "../../history/entities/history";

@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    password: string;

    @CreateDateColumn()
    registeredAt: Date;

    @OneToMany(() => History, (history) => history.user)
    histories: History[];
}