import {Injectable} from '@angular/core';
import {BehaviorSubject, tap} from 'rxjs';
import {User} from '../../../features/users/models/user';
import {AuthApiService} from './auth-api.service';
import {TokenStorageService} from '../token/token-storage.service';
import {LoginUserDto} from '../../../features/auth/dtos/login-user.dto';
import {jwtDecode} from 'jwt-decode';
import {RegisterUserDto} from '../../../features/auth/dtos/register-user.dto';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private $currentUser = new BehaviorSubject<User | null>(null);
    currentUser = this.$currentUser.asObservable();

    constructor(private readonly authApiService: AuthApiService,
                private readonly tokenStorageService: TokenStorageService) {
        this.loadUserFromTokenStorage();
    }

    login(loginUserDto: LoginUserDto) {
        return this.authApiService.login(loginUserDto).pipe(
            tap(
                (tokenData => {
                    this.tokenStorageService.setToken(tokenData.accessToken);
                    this.loadUserFromTokenStorage();
                })
            )
        );
    }

    register(registerUserDto: RegisterUserDto) {
        if (this.$currentUser.value) {
            this.logout();
        }
        return this.authApiService.register(registerUserDto).pipe(tap(tokenData => {
            this.tokenStorageService.setToken(tokenData.accessToken);
            this.loadUserFromTokenStorage();
        }))
    }

    logout() {
        this.tokenStorageService.removeToken();
        this.$currentUser.next(null);
    }

    private loadUserFromTokenStorage() {
        const token = this.tokenStorageService.getToken();
        if (token) {
            this.$currentUser.next(jwtDecode(token));
        }
    }
}
