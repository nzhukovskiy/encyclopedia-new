import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Article} from '../../models/article';
import {ButtonComponent} from "../../../../shared/components/button/button.component";
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../../../shared/components/dialog/dialog.component";
import {filter, switchMap} from "rxjs";
import {SubmitDialogReturn} from "../../../../shared/constants/submit-dialog-return";

@Component({
    selector: 'app-article-card',
    imports: [ButtonComponent, MatIconModule],
    templateUrl: './article-card.component.html',
    styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {
    @Input() article?: Article;
    @Output() deleteEvent = new EventEmitter<string>();

    constructor(private readonly matDialog: MatDialog) {
    }

    delete() {
        this.matDialog.open(DialogComponent).afterClosed()
            .pipe(
                filter((x) => x === SubmitDialogReturn.ACCEPT),
            )
            .subscribe(() => {
                this.deleteEvent.emit(this.article!._id);
            })
    }
}
