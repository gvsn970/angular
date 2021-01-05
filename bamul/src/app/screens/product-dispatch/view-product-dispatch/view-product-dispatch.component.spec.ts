import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductDispatchComponent } from './view-product-dispatch.component';

describe('ViewProductDispatchComponent', () => {
  let component: ViewProductDispatchComponent;
  let fixture: ComponentFixture<ViewProductDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProductDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
