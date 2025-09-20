import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ActionType} from "../constants/action-type";
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

    @Column({
        type: "enum",
        enum: ActionType
    })
    actionType: ActionType;

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