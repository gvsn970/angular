import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherSalesOrderDispatchSecurityComponent } from './other-sales-order-dispatch-security.component';

describe('OtherSalesOrderDispatchSecurityComponent', () => {
  let component: OtherSalesOrderDispatchSecurityComponent;
  let fixture: ComponentFixture<OtherSalesOrderDispatchSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherSalesOrderDispatchSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherSalesOrderDispatchSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
