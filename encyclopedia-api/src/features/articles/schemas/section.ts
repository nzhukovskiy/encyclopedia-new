import {Prop} from "@nestjs/mongoose";
import {Column} from "./column";

export class Section {
    @Prop()
    title: string;

    @Prop()
    columns: Column[];
}