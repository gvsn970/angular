import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVisitorRegisterComponent } from './view-visitor-register.component';

describe('ViewVisitorRegisterComponent', () => {
  let component: ViewVisitorRegisterComponent;
  let fixture: ComponentFixture<ViewVisitorRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVisitorRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVisitorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
