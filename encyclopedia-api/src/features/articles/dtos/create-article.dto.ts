import {IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested} from "class-validator";
import {PlaceAndDateDto} from "./auxiliary-objects/place-and-date.dto";
import {Type} from "class-transformer";
import {ResourceDto} from "./auxiliary-objects/resource.dto";
import {AppointmentDto} from "./auxiliary-objects/appointment.dto";
import {SectionDto} from "./auxiliary-objects/section.dto";

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

    @ValidateNested({each: true})
    @IsArray()
    @Type(()=>ResourceDto)
    resources: ResourceDto[];

    @ValidateNested({each: true})
    @IsArray()
    @Type(()=>AppointmentDto)
    appointments: AppointmentDto[];

    @ValidateNested({each: true})
    @IsArray()
    @Type(()=>SectionDto)
    sections: SectionDto[];
}