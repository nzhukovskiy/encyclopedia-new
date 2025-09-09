import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RegisterUserDto} from '../../dtos/register-user.dto';
import {FormFieldComponent} from '../../../../shared/components/form-field/form-field.component';
import {ButtonComponent} from '../../../../shared/components/button/button.component';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { showErrors } from '../../../../core/utils/form-validation-utils';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    FormFieldComponent,
    ButtonComponent,
    TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

    @Output() registerEvent = new EventEmitter<RegisterUserDto>();

    registerFormGroup = new FormGroup({
        email: new FormControl("", {nonNullable: true, validators: [Validators.required, Validators.email]}),
        password: new FormControl("", {nonNullable: true, validators: [Validators.required, Validators.minLength(8)]}),
        firstName: new FormControl("", {nonNullable: true, validators: [Validators.required]}),
        lastName: new FormControl("", {nonNullable: true, validators: [Validators.required]}),
    })

    register() {
        if (!this.registerFormGroup.invalid) {
            this.registerEvent.emit(this.registerFormGroup.getRawValue())
        }
    }

    protected readonly showErrors = showErrors;
}
