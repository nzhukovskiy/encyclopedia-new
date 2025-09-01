export class Appointment {
    constructor(title: string, startDate: Date, endDate: Date, predecessor: string, successor: string) {
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.predecessor = predecessor;
        this.successor = successor;
    }

    title: string;
    startDate: Date;
    endDate: Date;
    predecessor: string;
    successor: string;
}
