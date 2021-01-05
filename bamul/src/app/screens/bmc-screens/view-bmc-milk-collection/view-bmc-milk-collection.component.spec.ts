import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBmcMilkCollectionComponent } from './view-bmc-milk-collection.component';

describe('ViewBmcMilkCollectionComponent', () => {
  let component: ViewBmcMilkCollectionComponent;
  let fixture: ComponentFixture<ViewBmcMilkCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBmcMilkCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBmcMilkCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
