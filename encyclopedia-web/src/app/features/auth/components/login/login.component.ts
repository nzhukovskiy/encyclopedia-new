import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {LoginUserDto} from '../../dtos/login-user.dto';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

    @Output() loginEvent = new EventEmitter<LoginUserDto>();

    loginFormGroup = new FormGroup({
        email: new FormControl("", {nonNullable: true}),
        password: new FormControl("", {nonNullable: true})
    })

    login() {
        this.loginEvent.emit(this.loginFormGroup.getRawValue())
    }
}
