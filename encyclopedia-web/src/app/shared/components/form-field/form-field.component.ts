import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {DateValueAccessorDirective} from '../../../core/directives/date-value-accessor.directive';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {
    Alignment,
    Bold,
    ClassicEditor,
    Essentials, ImageUpload, Image,
    Italic,
    Paragraph,
    Subscript,
    Superscript,
    Underline, SimpleUploadAdapter
} from "ckeditor5";
import {TokenStorageService} from '../../../core/services/token/token-storage.service';

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
export class FormFieldComponent implements OnInit {

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
        plugins: [ Essentials, Paragraph, Bold, Italic, Subscript, Superscript, Underline, Alignment, Image, ImageUpload, SimpleUploadAdapter ],
        toolbar: [ 'undo', 'redo', '|', 'bold', 'italic', '|', 'subscript', 'superscript', 'underline', 'alignment', '|', 'imageUpload' ],
        simpleUpload: {
            uploadUrl: 'http://localhost:3000/images/upload',
            headers: {
                'X-CSRF-TOKEN': 'CSRF-Token',
                Authorization: ''
            }
        }
    }

    constructor(private readonly tokenStorageService: TokenStorageService) {
    }


    get formControl(): FormControl {
        return this.formGroup!.get(this.controlName!) as FormControl;
    }

    ngOnInit(): void {
        this.config.simpleUpload.headers.Authorization = `Bearer ${this.tokenStorageService.getToken()}`;
    }
}
