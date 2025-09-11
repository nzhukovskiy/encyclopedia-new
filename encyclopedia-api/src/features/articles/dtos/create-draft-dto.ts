import {PartialType} from "@nestjs/mapped-types";
import {CreateArticleDto} from "./create-article.dto";

export class CreateDraftDto extends PartialType(CreateArticleDto) {}