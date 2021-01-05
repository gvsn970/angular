import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRouteSheetComponent } from './list-route-sheet.component';

describe('ListRouteSheetComponent', () => {
  let component: ListRouteSheetComponent;
  let fixture: ComponentFixture<ListRouteSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRouteSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRouteSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
