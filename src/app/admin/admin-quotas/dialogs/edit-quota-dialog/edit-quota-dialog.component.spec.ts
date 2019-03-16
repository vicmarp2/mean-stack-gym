import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuotaDialogComponent } from './edit-quota-dialog.component';

describe('EditQuotaDialogComponent', () => {
  let component: EditQuotaDialogComponent;
  let fixture: ComponentFixture<EditQuotaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQuotaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuotaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
