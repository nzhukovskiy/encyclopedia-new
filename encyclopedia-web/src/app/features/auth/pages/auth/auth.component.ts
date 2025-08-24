import {Component, OnInit} from '@angular/core';
import {LoginComponent} from '../../components/login/login.component';
import {RegisterComponent} from '../../components/register/register.component';
import {AuthService} from '../../../../core/services/auth/auth.service';
import {AuthApiService} from '../../../../core/services/auth/auth-api.service';

@Component({
  selector: 'app-auth',
  imports: [LoginComponent, RegisterComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
    constructor(private readonly authService: AuthApiService) {
    }
    ngOnInit(): void {
        this.authService.login().subscribe(res => console.log(res))
    }

}
