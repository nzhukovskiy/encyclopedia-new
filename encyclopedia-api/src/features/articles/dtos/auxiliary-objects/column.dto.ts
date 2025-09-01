import {IsNumber, IsString} from "class-validator";

export class ColumnDto {
    @IsNumber()
    order: number;

    @IsString()
    text: string;
}