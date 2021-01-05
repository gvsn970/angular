import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorRegisterComponent } from './visitor-register.component';

describe('VisitorRegisterComponent', () => {
  let component: VisitorRegisterComponent;
  let fixture: ComponentFixture<VisitorRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
