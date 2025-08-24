import {CollectionProperties, Expose} from "@forlagshuset/nestjs-mongoose-paginate";

export class ArticlePaginationProperties extends CollectionProperties {
    @Expose({name: "title", sortable: true, filterable: true})
    title: string;
}