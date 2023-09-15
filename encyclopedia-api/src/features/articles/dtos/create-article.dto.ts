import {IsNotEmpty, IsOptional, IsString, ValidateNested} from "class-validator";
import {PlaceAndDateDto} from "./auxiliary-objects/place-and-date.dto";
import {Type} from "class-transformer";

export class CreateArticleDto {
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    body: string;

    @ValidateNested()
    @IsOptional()
    @Type(()=>PlaceAndDateDto)
    birth: PlaceAndDateDto;

    @ValidateNested()
    @IsOptional()
    @Type(()=>PlaceAndDateDto)
    death: PlaceAndDateDto;
}