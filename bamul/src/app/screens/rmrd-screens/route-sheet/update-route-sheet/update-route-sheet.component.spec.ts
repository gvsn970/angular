import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRouteSheetComponent } from './update-route-sheet.component';

describe('UpdateRouteSheetComponent', () => {
  let component: UpdateRouteSheetComponent;
  let fixture: ComponentFixture<UpdateRouteSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRouteSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRouteSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
