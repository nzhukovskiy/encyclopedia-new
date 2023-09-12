export interface IArticle {
    title: string;
    body: string;
    birth: {
        country: string;
        place: string;
    };
    death: {
        country: string;
        place: string;
    };
}