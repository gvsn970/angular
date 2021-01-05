import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DairyBmcRouteDetailsListComponent } from './dairy-bmc-route-details-list.component';

describe('DairyBmcRouteDetailsListComponent', () => {
  let component: DairyBmcRouteDetailsListComponent;
  let fixture: ComponentFixture<DairyBmcRouteDetailsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DairyBmcRouteDetailsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DairyBmcRouteDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
