import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ActionTypes} from "../constants/action-types";
import {User} from "../../users/entities/user";

@Entity()
export class History {
    @PrimaryGeneratedColumn()
    id: number;

    /*@Column()
    userId: number;*/

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

    @ManyToOne(() => User, (user) => user.histories)
    user: User;
}