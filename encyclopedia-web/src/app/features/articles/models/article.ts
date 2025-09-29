import {Section} from './section';
import {Appointment} from './appointment';
import {Resource} from './resource';
import {PlaceAndDate} from './place-and-date';
import { History } from '../../history/models/history';

export class Article {


    constructor(id: string, title: string, body: string, imagePath: string | null, birth: PlaceAndDate | null, death: PlaceAndDate | null, resources: Resource[], appointments: Appointment[], sections: Section[], createdAt: Date, updatedAt: Date, lastHistory: History | null) {
        this._id = id;
        this.title = title;
        this.body = body;
        this.imagePath = imagePath;
        this.birth = birth;
        this.death = death;
        this.resources = resources;
        this.appointments = appointments;
        this.sections = sections;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.lastHistory = lastHistory;
    }

    _id: string;
    title: string;
    body: string;
    imagePath: string | null;
    birth: PlaceAndDate | null;
    death: PlaceAndDate | null;
    resources: Resource[];
    appointments: Appointment[];
    sections: Section[];
    createdAt: Date;
    updatedAt: Date;
    lastHistory: History | null;
}
