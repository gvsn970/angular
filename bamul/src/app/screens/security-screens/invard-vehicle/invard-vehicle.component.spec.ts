import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvardVehicleComponent } from './invard-vehicle.component';

describe('InvardVehicleComponent', () => {
  let component: InvardVehicleComponent;
  let fixture: ComponentFixture<InvardVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvardVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvardVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
