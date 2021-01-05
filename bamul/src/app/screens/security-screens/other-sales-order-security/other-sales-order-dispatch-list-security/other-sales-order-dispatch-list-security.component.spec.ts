import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherSalesOrderDispatchListSecurityComponent } from './other-sales-order-dispatch-list-security.component';

describe('OtherSalesOrderDispatchListSecurityComponent', () => {
  let component: OtherSalesOrderDispatchListSecurityComponent;
  let fixture: ComponentFixture<OtherSalesOrderDispatchListSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherSalesOrderDispatchListSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherSalesOrderDispatchListSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
