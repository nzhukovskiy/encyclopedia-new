import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {LoginUserDto} from '../../dtos/login-user.dto';
import {RegisterUserDto} from '../../dtos/register-user.dto';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

    @Output() registerEvent = new EventEmitter<RegisterUserDto>();

    registerFormGroup = new FormGroup({
        email: new FormControl("", {nonNullable: true}),
        password: new FormControl("", {nonNullable: true}),
        firstName: new FormControl("", {nonNullable: true}),
        lastName: new FormControl("", {nonNullable: true}),
    })

    register() {
        this.registerEvent.emit(this.registerFormGroup.getRawValue())
    }
}
