import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeighmentEntryComponent } from './weighment-entry.component';

describe('WeighmentEntryComponent', () => {
  let component: WeighmentEntryComponent;
  let fixture: ComponentFixture<WeighmentEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeighmentEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeighmentEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
