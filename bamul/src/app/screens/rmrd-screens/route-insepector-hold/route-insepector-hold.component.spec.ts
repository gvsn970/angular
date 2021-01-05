import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteInsepectorHoldComponent } from './route-insepector-hold.component';

describe('RouteInsepectorHoldComponent', () => {
  let component: RouteInsepectorHoldComponent;
  let fixture: ComponentFixture<RouteInsepectorHoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteInsepectorHoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteInsepectorHoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
