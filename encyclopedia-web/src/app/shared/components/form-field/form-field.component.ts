import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {DateValueAccessorDirective} from '../../../core/directives/date-value-accessor.directive';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {
    Alignment,
    Bold,
    ClassicEditor,
    Essentials,
    Italic,
    Paragraph,
    Subscript,
    Superscript,
    Underline
} from "ckeditor5";

@Component({
  selector: 'app-form-field',
  imports: [MatIconModule,
      ReactiveFormsModule,
      CommonModule,
      DateValueAccessorDirective,
      CKEditorModule],
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

    public Editor = ClassicEditor;
    public config = {
        licenseKey: 'GPL', // Or 'GPL'.
        plugins: [ Essentials, Paragraph, Bold, Italic, Subscript, Superscript, Underline, Alignment ],
        toolbar: [ 'undo', 'redo', '|', 'bold', 'italic', '|', 'subscript', 'superscript', 'underline', 'alignment' ]
    }


    get formControl(): FormControl {
        return this.formGroup!.get(this.controlName!) as FormControl;
    }
}
