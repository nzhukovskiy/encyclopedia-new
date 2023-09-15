import {IsOptional, IsString} from "class-validator";

export class PlaceDto {
    @IsString()
    @IsOptional()
    country: string;

    @IsString()
    @IsOptional()
    place: string;
}