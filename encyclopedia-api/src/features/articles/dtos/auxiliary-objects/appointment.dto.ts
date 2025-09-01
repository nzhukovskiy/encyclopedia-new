import {IsDateString, IsString} from "class-validator";

export class AppointmentDto {
    @IsString()
    title: string;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;

    @IsString()
    predecessor: string;

    @IsString()
    successor: string;
}