export class User {
    constructor(id: number, email: string, firstName: string, lastName: string, password: string, registeredAt: Date) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.registeredAt = registeredAt;
    }

    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    registeredAt: Date;
}
