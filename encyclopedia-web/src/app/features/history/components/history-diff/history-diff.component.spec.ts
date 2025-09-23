import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDiffComponent } from './history-diff.component';

describe('HistoryDiffComponent', () => {
  let component: HistoryDiffComponent;
  let fixture: ComponentFixture<HistoryDiffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryDiffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryDiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
