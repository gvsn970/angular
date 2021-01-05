import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnmWeighingBridgeCcCampOperatorComponent } from './mnm-weighing-bridge-cc-camp-operator.component';

describe('MnmWeighingBridgeCcCampOperatorComponent', () => {
  let component: MnmWeighingBridgeCcCampOperatorComponent;
  let fixture: ComponentFixture<MnmWeighingBridgeCcCampOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnmWeighingBridgeCcCampOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnmWeighingBridgeCcCampOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
