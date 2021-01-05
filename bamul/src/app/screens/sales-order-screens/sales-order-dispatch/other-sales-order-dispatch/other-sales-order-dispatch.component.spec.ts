import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherSalesOrderDispatchComponent } from './other-sales-order-dispatch.component';

describe('OtherSalesOrderDispatchComponent', () => {
  let component: OtherSalesOrderDispatchComponent;
  let fixture: ComponentFixture<OtherSalesOrderDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherSalesOrderDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherSalesOrderDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
