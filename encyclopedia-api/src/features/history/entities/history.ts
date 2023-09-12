import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user";
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

    @Column()
    nextArticleId: string;

    @ManyToOne(() => User, (user) => user.histories)
    user: User;
}