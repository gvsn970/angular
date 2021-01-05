import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteInspectorComponent } from './route-inspector.component';

describe('RouteInspectorComponent', () => {
  let component: RouteInspectorComponent;
  let fixture: ComponentFixture<RouteInspectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteInspectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteInspectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
