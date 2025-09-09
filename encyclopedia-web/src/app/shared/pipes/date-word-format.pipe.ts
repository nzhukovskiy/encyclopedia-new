import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dateWordFormat',
    standalone: true
})
export class DateWordFormatPipe implements PipeTransform {

    transform(value: Date, ...args: unknown[]): string {
        value = new Date(value)
        const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября",
            "октября", "ноября", "декабря"];
        return `${value.getDate()} ${months[value.getMonth()]} ${value.getFullYear()}`;
    }

}
