import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    constructor() {
    }

    setToken(token: string) {
        localStorage.setItem("token", token);
    }

    getToken() {
        return localStorage.getItem("token");
    }

    removeToken() {
        localStorage.removeItem("token");
    }
}
