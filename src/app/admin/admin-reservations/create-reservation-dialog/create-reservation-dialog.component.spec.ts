import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReservationDialogComponent } from './create-reservation-dialog.component';

describe('CreateReservationDialogComponent', () => {
  let component: CreateReservationDialogComponent;
  let fixture: ComponentFixture<CreateReservationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateReservationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
