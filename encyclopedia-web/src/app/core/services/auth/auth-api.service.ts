import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginUserDto} from '../../../features/auth/dtos/login-user.dto';

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {

    constructor(private readonly httpClient: HttpClient) {

    }

    login(loginUserDto: LoginUserDto) {
        return this.httpClient.post<{accessToken: string}>("auth/login", loginUserDto);
    }
}
