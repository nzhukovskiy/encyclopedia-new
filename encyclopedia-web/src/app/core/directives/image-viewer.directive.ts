import {Directive, ElementRef, HostListener} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ImageHolderComponent} from '../../shared/components/image-holder/image-holder.component';

@Directive({
    selector: 'img[appImageViewer]'
})
export class ImageViewerDirective {

    constructor(private readonly dialog: MatDialog,
                private readonly imageElement: ElementRef<HTMLImageElement>) {
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.imageElement.nativeElement.style.cursor = 'pointer';
    }

    @HostListener('click') onClick() {
        const src = this.imageElement.nativeElement.src;
        const alt = this.imageElement.nativeElement.alt;

        this.dialog.open(ImageHolderComponent, {
            data: {src, alt},
            maxWidth: '95vw',
            maxHeight: '95vh',
            panelClass: 'image-dialog-panel',
            backdropClass: 'image-dialog-backdrop'
        });
    }
}
