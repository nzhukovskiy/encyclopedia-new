import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {ImageModalData} from '../../constants/image-modal-data';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-image-holder',
  imports: [MatIconModule],
  templateUrl: './image-holder.component.html',
  styleUrl: './image-holder.component.scss'
})
export class ImageHolderComponent {

    constructor(private readonly dialogRef: MatDialogRef<DialogComponent>,
                @Inject(MAT_DIALOG_DATA) protected data: ImageModalData) {
    }

    close() {
        this.dialogRef.close();
    }
}
