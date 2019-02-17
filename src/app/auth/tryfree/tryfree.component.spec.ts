import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TryfreeComponent } from './tryfree.component';

describe('TryfreeComponent', () => {
  let component: TryfreeComponent;
  let fixture: ComponentFixture<TryfreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TryfreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TryfreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
