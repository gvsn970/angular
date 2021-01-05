import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssignVehicleMilkTransferComponent } from './list-assign-vehicle-milk-transfer.component';

describe('ListAssignVehicleMilkTransferComponent', () => {
  let component: ListAssignVehicleMilkTransferComponent;
  let fixture: ComponentFixture<ListAssignVehicleMilkTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAssignVehicleMilkTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAssignVehicleMilkTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
