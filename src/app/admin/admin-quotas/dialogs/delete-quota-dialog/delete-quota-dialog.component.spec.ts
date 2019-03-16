import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQuotaDialogComponent } from './delete-quota-dialog.component';

describe('DeleteQuotaDialogComponent', () => {
  let component: DeleteQuotaDialogComponent;
  let fixture: ComponentFixture<DeleteQuotaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteQuotaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteQuotaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
