import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleOutwardSecurityComponent } from './vehicle-outward-security.component';

describe('VehicleOutwardSecurityComponent', () => {
  let component: VehicleOutwardSecurityComponent;
  let fixture: ComponentFixture<VehicleOutwardSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleOutwardSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleOutwardSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
