import { Component, Input } from '@angular/core';
import { Article } from '../../models/article';
import { FormSubmitButtonComponent } from "../../../../shared/components/form-submit-button/form-submit-button.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-article-card',
  imports: [FormSubmitButtonComponent, MatIconModule],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {
  @Input() article?: Article;
}
