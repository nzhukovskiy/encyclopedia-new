import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-form-field',
  imports: [MatIconModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {

    @Input() formGroup?: FormGroup;
    @Input() controlName?: string;
    @Input() label = "";
    @Input() type = "text";
    @Input() placeholder = "";
    @Input() iconCode = "";
    @Input() autocomplete = "";
    @Input() name = "";


    get formControl(): FormControl {
        return this.formGroup!.get(this.controlName!) as FormControl;
    }
}
