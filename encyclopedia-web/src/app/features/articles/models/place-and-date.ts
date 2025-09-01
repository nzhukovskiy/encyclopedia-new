import {Place} from './place';

export class PlaceAndDate {
    constructor(place: Place, date: Date) {
        this.place = place;
        this.date = date;
    }

    place: Place;
    date: Date;
}
