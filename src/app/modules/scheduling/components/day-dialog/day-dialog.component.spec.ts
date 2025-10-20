import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayDialogComponent } from './day-dialog.component';

describe('DayDialogComponent', () => {
  let component: DayDialogComponent;
  let fixture: ComponentFixture<DayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
