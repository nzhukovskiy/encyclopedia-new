import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {PlaceAndDate} from "./place-and-date";
import {Resource} from "./resource";
import {Appointment} from "./appointment";
import {Section} from "./section";
import {ArticleStatus} from "../constants/article-status";

@Schema({timestamps: true})
export class Article {
    @Prop()
    title: string;

    @Prop()
    body: string;

    @Prop()
    authorId?: string;

    @Prop({
        type: String,
        enum: Object.values(ArticleStatus),
        default: ArticleStatus.DRAFT,
        required: true,
        index: true,
    })
    status: ArticleStatus;

    @Prop()
    birth: PlaceAndDate;

    @Prop()
    death: PlaceAndDate;

    @Prop()
    resources: Resource[];

    @Prop()
    appointments: Appointment[];

    @Prop()
    sections: Section[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);