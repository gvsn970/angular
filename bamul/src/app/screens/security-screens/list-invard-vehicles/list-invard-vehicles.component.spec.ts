import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInvardVehiclesComponent } from './list-invard-vehicles.component';

describe('ListInvardVehiclesComponent', () => {
  let component: ListInvardVehiclesComponent;
  let fixture: ComponentFixture<ListInvardVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInvardVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInvardVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
