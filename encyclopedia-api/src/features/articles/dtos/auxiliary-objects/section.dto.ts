import {ArrayNotEmpty, IsArray, IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {ColumnDto} from "./column.dto";

export class SectionDto {
    @IsString()
    @IsOptional()
    title: string;

    @ValidateNested({each: true})
    @IsArray()
    @ArrayNotEmpty()
    @Type(()=>ColumnDto)
    columns: ColumnDto[];
}