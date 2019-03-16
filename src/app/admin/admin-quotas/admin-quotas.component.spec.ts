import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuotasComponent } from './admin-quotas.component';

describe('AdminQuotasComponent', () => {
  let component: AdminQuotasComponent;
  let fixture: ComponentFixture<AdminQuotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQuotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQuotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
