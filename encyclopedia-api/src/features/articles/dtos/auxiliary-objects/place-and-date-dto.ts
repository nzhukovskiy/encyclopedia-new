import {PlaceDto} from "./place-dto";
import {IsDateString, IsOptional, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class PlaceAndDateDto {
    @IsOptional()
    @ValidateNested()
    @Type(()=>PlaceDto)
    place: PlaceDto;

    @IsDateString()
    date: Date;
}