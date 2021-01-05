import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeVehicleLogComponent } from './employee-vehicle-log.component';

describe('EmployeeVehicleLogComponent', () => {
  let component: EmployeeVehicleLogComponent;
  let fixture: ComponentFixture<EmployeeVehicleLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeVehicleLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeVehicleLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
