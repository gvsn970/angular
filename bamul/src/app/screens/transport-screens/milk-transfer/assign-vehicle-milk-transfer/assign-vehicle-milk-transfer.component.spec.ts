import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignVehicleMilkTransferComponent } from './assign-vehicle-milk-transfer.component';

describe('AssignVehicleMilkTransferComponent', () => {
  let component: AssignVehicleMilkTransferComponent;
  let fixture: ComponentFixture<AssignVehicleMilkTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignVehicleMilkTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignVehicleMilkTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
