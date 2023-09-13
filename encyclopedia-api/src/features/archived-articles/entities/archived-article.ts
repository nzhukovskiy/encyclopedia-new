import {Schema, SchemaFactory} from "@nestjs/mongoose";
import {Article} from "../../articles/schemas/article";

@Schema()
export class ArchivedArticle extends Article {
}

export const ArchivedArticleSchema = SchemaFactory.createForClass(ArchivedArticle);