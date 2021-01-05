import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSocietyMilkDispatchComponent } from './view-society-milk-dispatch.component';

describe('ViewSocietyMilkDispatchComponent', () => {
  let component: ViewSocietyMilkDispatchComponent;
  let fixture: ComponentFixture<ViewSocietyMilkDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSocietyMilkDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSocietyMilkDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
