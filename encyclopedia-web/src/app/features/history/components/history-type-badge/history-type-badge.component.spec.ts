import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTypeBadgeComponent } from './history-type-badge.component';

describe('HistoryTypeBadgeComponent', () => {
  let component: HistoryTypeBadgeComponent;
  let fixture: ComponentFixture<HistoryTypeBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryTypeBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryTypeBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
