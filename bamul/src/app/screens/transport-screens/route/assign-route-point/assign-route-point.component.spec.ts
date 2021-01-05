import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRoutePointComponent } from './assign-route-point.component';

describe('AssignRoutePointComponent', () => {
  let component: AssignRoutePointComponent;
  let fixture: ComponentFixture<AssignRoutePointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignRoutePointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignRoutePointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
