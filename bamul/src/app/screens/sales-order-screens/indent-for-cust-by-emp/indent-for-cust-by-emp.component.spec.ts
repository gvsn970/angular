import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentForCustByEmpComponent } from './indent-for-cust-by-emp.component';

describe('IndentForCustByEmpComponent', () => {
  let component: IndentForCustByEmpComponent;
  let fixture: ComponentFixture<IndentForCustByEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndentForCustByEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentForCustByEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
