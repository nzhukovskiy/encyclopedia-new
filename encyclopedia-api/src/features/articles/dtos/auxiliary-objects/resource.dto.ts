import {IsString} from "class-validator";

export class ResourceDto {
    @IsString()
    key: string;

    @IsString()
    value: string;
}