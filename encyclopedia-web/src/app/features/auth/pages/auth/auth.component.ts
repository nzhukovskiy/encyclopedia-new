import {Component, OnInit} from '@angular/core';
import {LoginComponent} from '../../components/login/login.component';
import {RegisterComponent} from '../../components/register/register.component';
import {AuthService} from '../../../../core/services/auth/auth.service';
import {AuthApiService} from '../../../../core/services/auth/auth-api.service';
import {Router} from '@angular/router';
import {LoginUserDto} from '../../dtos/login-user.dto';
import {RegisterUserDto} from '../../dtos/register-user.dto';

@Component({
  selector: 'app-auth',
  imports: [LoginComponent, RegisterComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
    constructor(private readonly authService: AuthService,
                private readonly router: Router) {
    }
    ngOnInit(): void {
    }

    login(loginUserDto: LoginUserDto) {
        this.authService.login(loginUserDto).subscribe(() => {
            this.router.navigate([""]).then();
        })
    }

    register(registerUserDto: RegisterUserDto) {
        this.authService.register(registerUserDto).subscribe(() => {
            this.router.navigate([""]).then();
        })
    }
}
