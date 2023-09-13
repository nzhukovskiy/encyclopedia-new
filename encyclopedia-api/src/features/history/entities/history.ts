import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ActionTypes} from "../constants/action-types";

@Entity()
export class History {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    articleId: string;

    @CreateDateColumn()
    actionDate: Date;

    @Column()
    actionType: ActionTypes;

    @Column({
        nullable: true
    })
    previousArticleId: string;

    @Column({
        nullable: true
    })
    nextArticleId: string;
}