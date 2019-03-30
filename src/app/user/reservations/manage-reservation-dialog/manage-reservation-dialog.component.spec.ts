import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageReservationDialogComponent } from './manage-reservation-dialog.component';

describe('ManageReservationDialogComponent', () => {
  let component: ManageReservationDialogComponent;
  let fixture: ComponentFixture<ManageReservationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageReservationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
