export class Article {
    constructor(title: string, body: string, birth: { country: string; place: string }, death: {
        country: string;
        place: string
    }) {
        this.title = title;
        this.body = body;
        this.birth = birth;
        this.death = death;
    }

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
