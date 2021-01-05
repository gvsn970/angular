import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInvardVehicleComponent } from './update-invard-vehicle.component';

describe('UpdateInvardVehicleComponent', () => {
  let component: UpdateInvardVehicleComponent;
  let fixture: ComponentFixture<UpdateInvardVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInvardVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInvardVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
