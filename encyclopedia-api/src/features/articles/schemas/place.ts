import {Prop, Schema} from "@nestjs/mongoose";

@Schema({ _id: false })
export class Place {
    @Prop()
    country: string;

    @Prop()
    place: string;
}