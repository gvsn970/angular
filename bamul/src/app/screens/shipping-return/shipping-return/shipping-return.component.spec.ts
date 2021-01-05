import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingReturnComponent } from './shipping-return.component';

describe('ShippingReturnComponent', () => {
  let component: ShippingReturnComponent;
  let fixture: ComponentFixture<ShippingReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
