import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RegisterUserDto} from '../../dtos/register-user.dto';
import {FormFieldComponent} from '../../../../shared/components/form-field/form-field.component';
import {FormSubmitButtonComponent} from '../../../../shared/components/form-submit-button/form-submit-button.component';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormFieldComponent, FormSubmitButtonComponent],
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
