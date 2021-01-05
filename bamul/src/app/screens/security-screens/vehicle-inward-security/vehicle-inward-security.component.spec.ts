import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleInwardSecurityComponent } from './vehicle-inward-security.component';

describe('VehicleInwardSecurityComponent', () => {
  let component: VehicleInwardSecurityComponent;
  let fixture: ComponentFixture<VehicleInwardSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleInwardSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleInwardSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
