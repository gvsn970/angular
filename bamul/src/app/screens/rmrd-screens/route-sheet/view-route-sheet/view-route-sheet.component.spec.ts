import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRouteSheetComponent } from './view-route-sheet.component';

describe('ViewRouteSheetComponent', () => {
  let component: ViewRouteSheetComponent;
  let fixture: ComponentFixture<ViewRouteSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRouteSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRouteSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
