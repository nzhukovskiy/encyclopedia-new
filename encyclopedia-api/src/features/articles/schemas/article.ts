import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {PlaceAndDate} from "./place-and-date";
import {Resource} from "./resource";
import {Appointment} from "./appointment";
import {Section} from "./section";

@Schema({timestamps: true})
export class Article {
    @Prop()
    title: string;

    @Prop()
    body: string;

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