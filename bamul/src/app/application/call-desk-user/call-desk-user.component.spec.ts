import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallDeskUserComponent } from './call-desk-user.component';

describe('CallDeskUserComponent', () => {
  let component: CallDeskUserComponent;
  let fixture: ComponentFixture<CallDeskUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallDeskUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallDeskUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
