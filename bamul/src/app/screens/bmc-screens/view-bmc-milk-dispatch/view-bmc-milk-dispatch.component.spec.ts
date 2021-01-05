import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBmcMilkDispatchComponent } from './view-bmc-milk-dispatch.component';

describe('ViewBmcMilkDispatchComponent', () => {
  let component: ViewBmcMilkDispatchComponent;
  let fixture: ComponentFixture<ViewBmcMilkDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBmcMilkDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBmcMilkDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
