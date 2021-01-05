import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherSalesOrderDispatchListComponent } from './other-sales-order-dispatch-list.component';

describe('OtherSalesOrderDispatchListComponent', () => {
  let component: OtherSalesOrderDispatchListComponent;
  let fixture: ComponentFixture<OtherSalesOrderDispatchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherSalesOrderDispatchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherSalesOrderDispatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
