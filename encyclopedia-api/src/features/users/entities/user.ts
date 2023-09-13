import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";

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
}