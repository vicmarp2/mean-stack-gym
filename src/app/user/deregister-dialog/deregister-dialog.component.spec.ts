import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeregisterDialogComponent } from './deregister-dialog.component';

describe('DeregisterDialogComponent', () => {
  let component: DeregisterDialogComponent;
  let fixture: ComponentFixture<DeregisterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeregisterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeregisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
