import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGymsComponent } from './admin-gyms.component';

describe('AdminGymsComponent', () => {
  let component: AdminGymsComponent;
  let fixture: ComponentFixture<AdminGymsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGymsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGymsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
