import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoDashbaordComponent } from './so-dashbaord.component';

describe('SoDashbaordComponent', () => {
  let component: SoDashbaordComponent;
  let fixture: ComponentFixture<SoDashbaordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoDashbaordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoDashbaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
