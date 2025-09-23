import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePropertiesHistoryComponent } from './article-properties-history.component';

describe('ArticlePropertiesHistoryComponent', () => {
  let component: ArticlePropertiesHistoryComponent;
  let fixture: ComponentFixture<ArticlePropertiesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlePropertiesHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlePropertiesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
