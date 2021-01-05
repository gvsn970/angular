import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSalesOrderDispatchComponent } from './report-sales-order-dispatch.component';

describe('ReportSalesOrderDispatchComponent', () => {
  let component: ReportSalesOrderDispatchComponent;
  let fixture: ComponentFixture<ReportSalesOrderDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSalesOrderDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSalesOrderDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
