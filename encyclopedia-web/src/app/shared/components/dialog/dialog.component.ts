import {Component, OnInit} from '@angular/core';
import {
    MAT_DIALOG_DATA,
        MatDialog,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogRef,
        MatDialogTitle,
} from '@angular/material/dialog';
import {tap} from "rxjs";
import {SubmitDialogReturn} from "../../constants/submit-dialog-return";
import {ButtonComponent} from "../button/button.component";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-dialog',
  imports: [ButtonComponent, MatIconModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {

    constructor(private readonly dialogRef: MatDialogRef<DialogComponent>) {
    }

    ngOnInit(): void {
        this.dialogRef.beforeClosed().pipe(tap(x => {
            if (x == undefined) {
                return SubmitDialogReturn.REJECT;
            }
            return x;
        }));
    }

    closeWithAccept() {
        this.dialogRef.close(SubmitDialogReturn.ACCEPT);
    }

    closeWithReject() {
        this.dialogRef.close(SubmitDialogReturn.REJECT);
    }
}
