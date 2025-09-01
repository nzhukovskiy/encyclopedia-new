import {Prop} from "@nestjs/mongoose";

export class Column {
    @Prop()
    order: number;

    @Prop()
    text: string;
}