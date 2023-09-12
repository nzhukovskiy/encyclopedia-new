import {Prop, Schema} from "@nestjs/mongoose";
import {Place} from "./place";

@Schema({ _id: false })
export class PlaceAndDate {
    @Prop()
    place: Place;

    @Prop()
    date: Date;
}