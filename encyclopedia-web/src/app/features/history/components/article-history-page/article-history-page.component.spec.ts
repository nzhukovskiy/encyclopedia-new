import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleHistoryPageComponent } from './article-history-page.component';

describe('ArticleHistoryPageComponent', () => {
  let component: ArticleHistoryPageComponent;
  let fixture: ComponentFixture<ArticleHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleHistoryPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
