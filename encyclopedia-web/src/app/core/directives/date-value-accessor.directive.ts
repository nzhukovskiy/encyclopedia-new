import {Directive, ElementRef, forwardRef, HostListener, Renderer2} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Directive({
    standalone: true,
    selector: 'input[appDateInput]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateValueAccessorDirective),
            multi: true
        }
    ]
})
export class DateValueAccessorDirective implements ControlValueAccessor {

    @HostListener('input', ['$event.target.valueAsDate'])
    onChange = (_: any) => {};

    @HostListener('blur', [])
    onTouched = () => {};

    constructor(private elementRef: ElementRef) {}

    writeValue(value: any): void {
        if (value instanceof Date && !isNaN(value.getTime())) {
            this.elementRef.nativeElement.valueAsDate = value;
        } else {
            this.elementRef.nativeElement.value = null;
        }
    }

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.elementRef.nativeElement.disabled = isDisabled;
    }
}
