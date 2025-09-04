import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-form-submit-button',
  imports: [],
  templateUrl: './form-submit-button.component.html',
  styleUrl: './form-submit-button.component.scss'
})
export class FormSubmitButtonComponent {

    @Input() buttonText = "";
    @Output() clickEvent = new EventEmitter();

    handleClick() {
        this.clickEvent.emit();
    }
}
