import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRoutesPointsComponent } from './list-routes-points.component';

describe('ListRoutesPointsComponent', () => {
  let component: ListRoutesPointsComponent;
  let fixture: ComponentFixture<ListRoutesPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRoutesPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRoutesPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
