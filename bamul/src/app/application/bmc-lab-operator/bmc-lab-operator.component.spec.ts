import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmcLabOperatorComponent } from './bmc-lab-operator.component';

describe('BmcLabOperatorComponent', () => {
  let component: BmcLabOperatorComponent;
  let fixture: ComponentFixture<BmcLabOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmcLabOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmcLabOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
