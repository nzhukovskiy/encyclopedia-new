import {CommonModule, NgTemplateOutlet} from '@angular/common';
import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [NgTemplateOutlet, CommonModule, RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

    @Input() buttonText = "";
    @Input() buttonType: "submit" | "button" | "link" = "button";
    @Input() buttonStyle: "default" | "danger" | "success" = "default";
    @Input() buttonOutline: "big" | "small" = "big";
    @Input() link = "";
    @Output() clickEvent = new EventEmitter();

    @ContentChild(TemplateRef) contentTemplate!: TemplateRef<any>;

    handleClick() {
        this.clickEvent.emit();
    }
}
