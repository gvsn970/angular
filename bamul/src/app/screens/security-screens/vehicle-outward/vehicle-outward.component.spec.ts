import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleOutwardComponent } from './vehicle-outward.component';

describe('VehicleOutwardComponent', () => {
  let component: VehicleOutwardComponent;
  let fixture: ComponentFixture<VehicleOutwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleOutwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleOutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
