import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DairyBmcRouteDetailsViewComponent } from './dairy-bmc-route-details-view.component';

describe('DairyBmcRouteDetailsViewComponent', () => {
  let component: DairyBmcRouteDetailsViewComponent;
  let fixture: ComponentFixture<DairyBmcRouteDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DairyBmcRouteDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DairyBmcRouteDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
