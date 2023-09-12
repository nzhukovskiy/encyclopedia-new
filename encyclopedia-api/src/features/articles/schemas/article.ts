import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {PlaceAndDate} from "./place-and-date";

@Schema()
export class Article {
    @Prop()
    title: string;

    @Prop()
    body: string;

    @Prop()
    birth: PlaceAndDate;

    @Prop()
    death: PlaceAndDate;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
/*export const ArticleSchema = new mongoose.Schema({
    title: String,
    body: String,
    birth: {
        place: {
            country: String,
            place: String
        },
        date: Date
    },
    death: {
        place: {
            country: String,
            place: String
        },
        date: Date
    }
})*/