import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'ageFormat'
})
export class AgeFormatPipe implements PipeTransform {

    transform(value: number, ...args: unknown[]): unknown {
        if (value % 10 == 1) {
            if (value / 10 % 10 < 1 || value / 10 % 10 >= 2) {
                return `${value} год`
            }
            return `${value} лет`
        }

        else if (value % 10 > 1 && value % 10 < 5) {
            if (value / 10 % 10 < 1 || value / 10 % 10 >= 2) {
                return `${value} года`
            }
            else {
                return `${value} лет`
            }
        }
        else {
            return `${value} лет`
        }
    }
}
