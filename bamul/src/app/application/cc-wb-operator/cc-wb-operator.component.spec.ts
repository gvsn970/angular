import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcWbOperatorComponent } from './cc-wb-operator.component';

describe('CcWbOperatorComponent', () => {
  let component: CcWbOperatorComponent;
  let fixture: ComponentFixture<CcWbOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcWbOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcWbOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
