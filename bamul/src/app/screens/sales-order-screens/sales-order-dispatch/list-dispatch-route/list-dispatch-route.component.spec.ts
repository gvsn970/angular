import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDispatchRouteComponent } from './list-dispatch-route.component';

describe('ListDispatchRouteComponent', () => {
  let component: ListDispatchRouteComponent;
  let fixture: ComponentFixture<ListDispatchRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDispatchRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDispatchRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
