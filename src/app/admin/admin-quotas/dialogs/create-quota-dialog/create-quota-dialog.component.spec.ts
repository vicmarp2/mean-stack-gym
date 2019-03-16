import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuotaDialogComponent } from './create-quota-dialog.component';

describe('CreateQuotaDialogComponent', () => {
  let component: CreateQuotaDialogComponent;
  let fixture: ComponentFixture<CreateQuotaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQuotaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuotaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
