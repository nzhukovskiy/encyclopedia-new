import {Prop, Schema} from "@nestjs/mongoose";

@Schema({ _id: false })
export class Resource {
    @Prop()
    key: string;

    @Prop()
    value: string;
}