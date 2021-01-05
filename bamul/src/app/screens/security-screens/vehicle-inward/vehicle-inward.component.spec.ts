import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleInwardComponent } from './vehicle-inward.component';

describe('VehicleInwardComponent', () => {
  let component: VehicleInwardComponent;
  let fixture: ComponentFixture<VehicleInwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleInwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
