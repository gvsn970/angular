import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRoutePointComponent } from './update-route-point.component';

describe('UpdateRoutePointComponent', () => {
  let component: UpdateRoutePointComponent;
  let fixture: ComponentFixture<UpdateRoutePointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRoutePointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRoutePointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
