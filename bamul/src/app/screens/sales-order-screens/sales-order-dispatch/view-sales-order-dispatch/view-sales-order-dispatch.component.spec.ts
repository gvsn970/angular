import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalesOrderDispatchComponent } from './view-sales-order-dispatch.component';

describe('ViewSalesOrderDispatchComponent', () => {
  let component: ViewSalesOrderDispatchComponent;
  let fixture: ComponentFixture<ViewSalesOrderDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSalesOrderDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSalesOrderDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
