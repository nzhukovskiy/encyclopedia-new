import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleHistoryPageComponent } from './single-history-page.component';

describe('SingleHistoryPageComponent', () => {
  let component: SingleHistoryPageComponent;
  let fixture: ComponentFixture<SingleHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleHistoryPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
