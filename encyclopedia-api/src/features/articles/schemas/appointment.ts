import {Prop, Schema} from "@nestjs/mongoose";

@Schema({ _id: false })
export class Appointment {
    @Prop()
    title: string;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop()
    predecessor: string;

    @Prop()
    successor: string;
}