import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Article} from '../../models/article';
import { DateWordFormatPipe } from "../../../../shared/pipes/date-word-format.pipe";
import {DomSanitizer} from '@angular/platform-browser';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import {millisecondsInYear} from '../../constants/date-constants';
import { AgeFormatPipe } from '../../../../shared/pipes/age-format.pipe';

@Component({
  selector: 'app-article-page',
  imports: [DateWordFormatPipe, ButtonComponent, MatIconModule, AgeFormatPipe],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.scss'
})
export class ArticlePageComponent implements OnInit {
    constructor(private readonly route: ActivatedRoute,
                protected readonly sanitizer: DomSanitizer) {
    }

    article?: Article;
    ngOnInit(): void {
        this.route.data.subscribe(({article}) => {
            this.article = article;
        })
    }

    get articleBody() {
        return this.sanitizer.bypassSecurityTrustHtml(this.article!.body.replace(/\r\n|\r|\n/g, '<br>'));
    }

    get age() {
        const subtractDate = this.article?.death ? this.article.death.date : new Date();
        return Math.floor((subtractDate.getTime() - this.article!.birth!.date.getTime()) / millisecondsInYear);
    }
}
