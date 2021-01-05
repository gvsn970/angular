import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewKeylogRegisterComponent } from './view-keylog-register.component';

describe('ViewKeylogRegisterComponent', () => {
  let component: ViewKeylogRegisterComponent;
  let fixture: ComponentFixture<ViewKeylogRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewKeylogRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewKeylogRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
