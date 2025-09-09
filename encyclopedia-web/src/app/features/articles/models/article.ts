import {Section} from './section';
import {Appointment} from './appointment';
import {Resource} from './resource';
import {PlaceAndDate} from './place-and-date';

export class Article {

    constructor(id: string, title: string, body: string, birth: PlaceAndDate, death: PlaceAndDate, resources: Resource[], appointments: Appointment[], sections: Section[], createdAt: Date, updatedAt: Date) {
        this._id = id;
        this.title = title;
        this.body = body;
        this.birth = birth;
        this.death = death;
        this.resources = resources;
        this.appointments = appointments;
        this.sections = sections;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    _id: string;
    title: string;
    body: string;
    birth: PlaceAndDate | null;
    death: PlaceAndDate | null;
    resources: Resource[];
    appointments: Appointment[];
    sections: Section[];
    createdAt: Date;
    updatedAt: Date;
}
