import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoutePointComponent } from './create-route-point.component';

describe('CreateRoutePointComponent', () => {
  let component: CreateRoutePointComponent;
  let fixture: ComponentFixture<CreateRoutePointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRoutePointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoutePointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
