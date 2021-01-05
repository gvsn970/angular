import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignVehicleMilkTransferComponent } from './view-assign-vehicle-milk-transfer.component';

describe('ViewAssignVehicleMilkTransferComponent', () => {
  let component: ViewAssignVehicleMilkTransferComponent;
  let fixture: ComponentFixture<ViewAssignVehicleMilkTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAssignVehicleMilkTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssignVehicleMilkTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
