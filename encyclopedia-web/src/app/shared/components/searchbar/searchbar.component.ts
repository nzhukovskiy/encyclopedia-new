import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs';
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'app-searchbar',
    imports: [ReactiveFormsModule, MatIconModule],
    templateUrl: './searchbar.component.html',
    styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent implements OnInit {

    @Input() value = "";
    @Output() searchEvent = new EventEmitter<string>();

    searchFormControl = new FormControl("", {nonNullable: true})

    ngOnInit(): void {
        this.searchFormControl.setValue(this.value, {emitEvent: false});
        this.searchFormControl.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(title => {
            this.searchEvent.emit(title);
        })
    }
}
