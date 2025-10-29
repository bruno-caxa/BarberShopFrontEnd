import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCustomerDialogComponent } from './schedule-customer-dialog.component';

describe('ScheduleCustomerDialogComponent', () => {
  let component: ScheduleCustomerDialogComponent;
  let fixture: ComponentFixture<ScheduleCustomerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleCustomerDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScheduleCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
