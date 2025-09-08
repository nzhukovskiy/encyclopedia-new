import { NgTemplateOutlet } from '@angular/common';
import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-form-submit-button',
  imports: [NgTemplateOutlet],
  templateUrl: './form-submit-button.component.html',
  styleUrl: './form-submit-button.component.scss'
})
export class FormSubmitButtonComponent {

    @Input() buttonText = "";
    @Input() buttonType: "submit" | "button" | "link" = "button";
    @Input() link = "";
    @Output() clickEvent = new EventEmitter();

    @ContentChild(TemplateRef) contentTemplate!: TemplateRef<any>;

    handleClick() {
        this.clickEvent.emit();
    }
}
