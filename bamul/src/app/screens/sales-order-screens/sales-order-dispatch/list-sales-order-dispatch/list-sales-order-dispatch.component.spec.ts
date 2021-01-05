import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalesOrderDispatchComponent } from './list-sales-order-dispatch.component';

describe('ListSalesOrderDispatchComponent', () => {
  let component: ListSalesOrderDispatchComponent;
  let fixture: ComponentFixture<ListSalesOrderDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSalesOrderDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSalesOrderDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
