import { Component, Input } from '@angular/core';
import { Article } from '../../models/article';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-article-card',
  imports: [ButtonComponent, MatIconModule],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {
  @Input() article?: Article;
}
