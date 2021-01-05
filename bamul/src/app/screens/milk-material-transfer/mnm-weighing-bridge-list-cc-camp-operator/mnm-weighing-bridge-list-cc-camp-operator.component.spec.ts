import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnmWeighingBridgeListCcCampOperatorComponent } from './mnm-weighing-bridge-list-cc-camp-operator.component';

describe('MnmWeighingBridgeListCcCampOperatorComponent', () => {
  let component: MnmWeighingBridgeListCcCampOperatorComponent;
  let fixture: ComponentFixture<MnmWeighingBridgeListCcCampOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnmWeighingBridgeListCcCampOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnmWeighingBridgeListCcCampOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
