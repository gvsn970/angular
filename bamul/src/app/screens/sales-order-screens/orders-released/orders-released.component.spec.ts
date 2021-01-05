import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersReleasedComponent } from './orders-released.component';

describe('OrdersReleasedComponent', () => {
  let component: OrdersReleasedComponent;
  let fixture: ComponentFixture<OrdersReleasedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersReleasedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersReleasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
