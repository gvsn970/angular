import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnmWeighingBridgeListDairyOperatorComponent } from './mnm-weighing-bridge-list-dairy-operator.component';

describe('MnmWeighingBridgeListDairyOperatorComponent', () => {
  let component: MnmWeighingBridgeListDairyOperatorComponent;
  let fixture: ComponentFixture<MnmWeighingBridgeListDairyOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnmWeighingBridgeListDairyOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnmWeighingBridgeListDairyOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
