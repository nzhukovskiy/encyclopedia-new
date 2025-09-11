import {CommonModule, NgTemplateOutlet} from '@angular/common';
import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [NgTemplateOutlet, CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

    @Input() buttonText = "";
    @Input() buttonType: "submit" | "button" | "link" = "button";
    @Input() buttonStyle: "default" | "danger" = "default";
    @Input() buttonOutline: "big" | "small" = "big";
    @Input() link = "";
    @Output() clickEvent = new EventEmitter();

    @ContentChild(TemplateRef) contentTemplate!: TemplateRef<any>;

    handleClick() {
        this.clickEvent.emit();
    }
}
