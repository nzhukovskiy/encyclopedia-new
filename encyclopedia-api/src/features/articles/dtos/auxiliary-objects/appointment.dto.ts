import {IsDateString, IsOptional, IsString} from "class-validator";

export class AppointmentDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsDateString()
    startDate: Date;

    @IsOptional()
    @IsDateString()
    endDate: Date;

    @IsOptional()
    @IsString()
    predecessor: string;

    @IsOptional()
    @IsString()
    successor: string;
}